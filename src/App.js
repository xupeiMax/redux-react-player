import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from "react-redux";
import {toggleMusicItem} from './actions'
import $ from 'jquery'
import jplayer from 'jplayer'
import Pubsub from 'pubsub-js'
import './App.css';
import Header from './components/header'
import Play from './pages/play'
import MusicLists from './pages/musiclist'

@connect(({ currentMusicItem, model, musiclists }) => ({
  currentMusicItem, model, musiclists
}), (dispatch) => ({
onToggleMusic(musicitem) {
  dispatch(toggleMusicItem(musicitem))
}
}))

class App extends Component {
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });

    this.playMusic(this.props.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e) => {
      switch (this.props.model.model) {
        case 'cycle':
          this.autoPlayNext('cycle');
          break;
        case 'once':
          this.autoPlayNext('once');
          break;
        case 'random':
          this.autoPlayNext('random');
          break;
        default:
          break;
      }
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicitem) => {
      this.playMusic(musicitem);
    })

    Pubsub.subscribe('PLAY_PREV', (msg) => {
      this.playNext("prev");
    })

    Pubsub.subscribe('PLAY_NEXT', (msg) => {
      this.playNext("next");
    })
  }

  componentWillUnmount() {
    $('#player').unbind($.jPlayer.event.ended);
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('PLAY_PREV');
    Pubsub.unsubscribe('PLAY_NEXT');
  }

  playMusic(musicitem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicitem.file
    }).jPlayer('play')
  }

  playNext(type = "next") {
    let index = this.getMusicIndex(this.props.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.props.musiclists.length;
    let model = this.props.model.model;
    if (type === "next") {
      switch (model) {
        case 'random':
          do {
            newIndex = Math.floor(Math.random() * musicListLength);
          } while (newIndex === index)
          break;
        default:
          newIndex = (index + 1) % musicListLength;
      }
    } else {
      switch (model) {
        case 'random':
          do {
            newIndex = Math.floor(Math.random() * musicListLength);
          } while (newIndex === index)
          break;
        default:
          newIndex = (index - 1 + musicListLength) % musicListLength;
      }
    }
    if (!this.props.musiclists[newIndex]) return;
    this.playMusic(this.props.musiclists[newIndex]);
    this.props.onToggleMusic(this.props.musiclists[newIndex])
  }
  autoPlayNext(model) {
    let index = this.getMusicIndex(this.props.currentMusicItem);
    let newIndex = null;
    let musicListLength = this.props.musiclists.length;
    switch (model) {
      case 'once':
        newIndex = index;
        break;
      case 'random':
        do {
          newIndex = Math.floor(Math.random() * musicListLength);
        } while (newIndex === index)
        break;
      default:
        newIndex = (index + 1) % musicListLength;
        break;
    }

    if (!this.props.musiclists[newIndex]) return;
    this.playMusic(this.props.musiclists[newIndex]);
    this.props.onToggleMusic(this.props.musiclists[newIndex])
  }
  getMusicIndex(musicitem) {
    return this.props.musiclists.indexOf(musicitem);
  }

  render() {
    return (
      <Router>
        <section>
          <Header />
          <Switch>
            <Route exact path="/" component={Play} />
            <Route path="/list" component={MusicLists} />
          </Switch>
        </section>
      </Router>
    );
  }
}

export default App;
