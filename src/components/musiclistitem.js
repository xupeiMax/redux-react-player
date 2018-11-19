import React from 'react'
import './musiclistitem.css'

const MusicListItem = ({onClick,onToggle, title, artist, focus}) => (
    <li className={`component-musiclistitem row ${focus ? 'focus':''}`} onClick={onToggle}>
        <p><strong>{title}</strong> - {artist}</p>
        <p onClick={onClick} className="-col-auto delete"></p>
    </li>
)

export default MusicListItem;