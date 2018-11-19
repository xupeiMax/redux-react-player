import musiclists from "./musiclist"
import currentMusicItem from "./currentMusicItem"
import model from "./model"
import { combineReducers } from "redux";

const todoApp = combineReducers({
    musiclists,
    currentMusicItem,
    model
})

export default todoApp