import { MUSIC_LIST } from '../sources/musiclist'

const musiclists = (state = MUSIC_LIST, action) => {
    switch (action.type) {
        case "REMOVE_MUSICITEM" :
            return state.filter(t => t !== action.musicitem)
        default:
            return state
    }
}

export default musiclists