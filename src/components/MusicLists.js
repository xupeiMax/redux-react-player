
import React from 'react';
import PropTypes from 'prop-types'
import MusicListItem from "./musiclistitem"
import Pubsub from 'pubsub-js'

const MusicLists = ({musiclists, currentMusicItem, onRemoveClick, onToggleMusicItem}) => (
    <ul>
        {musiclists.map(musicitem=>(
            <MusicListItem 
            key={musicitem.id} 
            focus={currentMusicItem === musicitem} 
            {...musicitem} 
            onToggle={()=>{Pubsub.publish('PLAY_MUSIC',musicitem);onToggleMusicItem(musicitem)}} 
            onClick={()=>onRemoveClick(musicitem)} 
            />
        ))}
    </ul>
)

MusicLists.propTypes = {
    musiclists: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.number.isRequired,
           title: PropTypes.string.isRequired,
           artist: PropTypes.string.isRequired,
           file: PropTypes.string.isRequired,
           cover: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    onToggleMusicItem: PropTypes.func.isRequired
}

export default MusicLists