
import React, { Component, Fragment }  from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import jplayer from 'jplayer'
import Pubsub from 'pubsub-js'
import Progress from '../components/progress'
import './Play.css'


let duration = null;
class Controller extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            progress: 0,
            volume: 0,
            leftTime: ''
        };
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = Math.round(e.jPlayer.status.duration);
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute),
                volume: Math.round(e.jPlayer.options.volume * 100),
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            })
        });
        $('#player').bind($.jPlayer.event.play, (e) => {
            // 拿到当前播放状态
            // 如果正在播放
            if (!e.jPlayer.status.paused) {
                let model = this.props.model;
                if (!model.isplay) {
                    this.props.onTogglePlay()
                }
            }
        })
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
        $('#player').unbind($.jPlayer.event.play);
    }
    progressChange = (progress) => {
        let isPlay = this.props.model.isplay;
        if (isPlay) {
            $('#player').jPlayer('play', duration * progress);
        } else {
            $('#player').jPlayer('pause', duration * progress);
        }
        this.setState({
            progress: progress
        })
    }

    volumeChange = (progress) => {
        $('#player').jPlayer('volume', progress);
        this.setState({
            volume: progress * 100
        })
    }
    formatTime(time) {
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds
        return `${minutes}:${seconds}`
    }

    render() {
        return <Fragment>
         <div className="row mt20">
            <div className="left-time -col-auto">-{this.state.leftTime}</div>
            <div className="volume-container">
                <i className="icon-volume rt" style={{top: 5,left: -5}}></i>
                <div className="volume-wrapper">
                    <Progress progress={this.state.volume} progressChange={this.volumeChange} barColor="#aaa"/>
                </div>
            </div>
        </div>
        <div style={{height: 10,lineHeight: 10,marginTop: 10}}>
            <Progress progress={this.state.progress} progressChange={this.progressChange}/>
        </div>
        </Fragment>
    }
}

class PlayNext extends Component {
    playHandler = (e) => {
        e.stopPropagation();
        if (this.props.model.isplay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.props.onTogglePlay()
    }

    playPrev = (e) => {
        let model = this.props.model;
        if (!model.isplay) {
            this.props.onTogglePlay()
        }
        e.stopPropagation();
        Pubsub.publish('PLAY_PREV');
    }

    playNext = (e) => {
        let model = this.props.model;
        if (!model.isplay) {
            this.props.onTogglePlay()
        }
        e.stopPropagation();
        Pubsub.publish('PLAY_NEXT');
    }
    render() {
        return <div>
                <i className="icon prev" onClick={this.playPrev}></i>
                <i className={`icon ml20 ${this.props.model.isplay?'pause':'play'}`} onClick={this.playHandler}></i>
                <i className="icon next ml20" onClick={this.playNext}></i>
            </div>
    }
}

class Repeat extends Component {
    playRepeat(model) {
        const MODEL = ['cycle', 'random', 'once'];
        let currentModel = MODEL.indexOf(model);
        let newModel = (currentModel + 1) % 3;
        this.props.onToggleModel(MODEL[newModel]);
    }
    render() {
        let model = this.props.model;
        return (
            <div className="-col-auto">
                <i id="repeat" className={`icon repeat-${model.model}`} onClick={this.playRepeat.bind(this,model.model)}></i>
            </div>
        );
    }
}

const Play = ({model,currentMusicItem, onToggleModel, onTogglePlay, onToggleMusicItem}) => (
    <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
            <div className="controll-wrapper">
                <h2 className="music-title">{currentMusicItem.title}</h2>
                <h3 className="music-artist">{currentMusicItem.artist}</h3>
                <Controller model={model} onTogglePlay={onTogglePlay} />
                <div className="mt35 row">
                    <PlayNext model={model} onTogglePlay={onTogglePlay} onToggleMusicItem={onToggleMusicItem} />
                    <Repeat model={model} onToggleModel={onToggleModel} />
                </div>
            </div>
            <div className="-col-auto cover">
                <img className="music-pic" style={{'animationPlayState': model.isplay? 'running': 'paused'}} src={currentMusicItem.cover} alt="歌曲名称" />
            </div>
        </div>
    </div>
)

Play.propTypes = {
    model: PropTypes.object.isRequired,
    currentMusicItem: PropTypes.object.isRequired,
    onToggleModel: PropTypes.func.isRequired,
    onTogglePlay: PropTypes.func.isRequired,
    onToggleMusicItem: PropTypes.func.isRequired
}

export default Play