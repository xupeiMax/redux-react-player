const INITIAL_STATE = {
    isplay: false,
    model: 'cycle'
}

const model = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "TOGGLE_PLAY":
            return Object.assign({}, state, {
                isplay: !state.isplay
            })
        case "TOGGLE_MODEL":
            return {
                ...state,
                model: action.model
            }
        default:
            return state
    }
}

export default model