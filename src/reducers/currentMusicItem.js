import { MUSIC_LIST } from '../sources/musiclist'
const INITIAL_STATE = MUSIC_LIST[0]
const currentMusicItem = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLE_MUSICITEM" :
            return action.musicitem
        default:
            return state
    }
}

export default currentMusicItem