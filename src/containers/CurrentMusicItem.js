import { connect } from "react-redux";
import { toggleMusicItem,toggleModel, togglePlay } from "../actions"
import Play from "../components/Play"


const mapStateToProps = (state) => {
    return {
        currentMusicItem: state.currentMusicItem,
        model: state.model
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleMusicItem: (musicitem) => {
            dispatch(toggleMusicItem(musicitem))
        },
        onToggleModel: (filter) => {
            dispatch(toggleModel(filter))
        },
        onTogglePlay: () => {
            dispatch(togglePlay())
        }
    }
}

const CurrentMusicItem = connect(
    mapStateToProps,
    mapDispatchToProps
)(Play)

export default CurrentMusicItem