const INITIAL_VALUE = {
    loader: true,
}

export default function loaderReducer(state = INITIAL_VALUE, action) {
    switch (action.type) {
        case 'CHANGE_LOADER' : return {
            ...state,
            loader: action.payload
        }
        default : return state
    }

}