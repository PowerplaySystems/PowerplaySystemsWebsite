import {
    HOME_BANNER
} from './AppConstants'



export default function reducer(state, action) {
    switch (action.type) {
        case HOME_BANNER:
            return {
                ...state,
                homeBanner: action.payload,
            };
        
        
        default:
            return state
    }
}

