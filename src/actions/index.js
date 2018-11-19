
export const toggleModel = (model) => {
    return {
        type: "TOGGLE_MODEL",
        model
    }
}

export const togglePlay = () => {
    return {
        type: "TOGGLE_PLAY",
        // isplay
    }
}

export const removeMusicItem = (musicitem) => {
    return {
        type: "REMOVE_MUSICITEM",
        musicitem
    }
}

export const toggleMusicItem = (musicitem) => {
    return {
        type: "TOGGLE_MUSICITEM",
        musicitem
    }
}
