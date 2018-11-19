import { connect } from "react-redux";
import { removeMusicItem } from "../actions"
import { toggleMusicItem } from "../actions"
import MusicLists from "../components/MusicLists"


const mapStateToProps = (state) => {
    return {
        musiclists: state.musiclists,
        currentMusicItem: state.currentMusicItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onRemoveClick: (musicitem) => {
            dispatch(removeMusicItem(musicitem))
        },
        onToggleMusicItem: (musicitem) => {
            dispatch(toggleMusicItem(musicitem))
        }
    }
}

const MusicList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicLists)

export default MusicList