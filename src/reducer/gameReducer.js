import initialState from './initialState';

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_INPUT':
            return {
                ...state,
                inputValue: action.inputValue
            }
        case 'CHANGE_ANSWER':
            return {
                ...state,
                answer : action.answer
            }
        case 'CHANGE_GAME':
            return {
                ...state,
                isGameStart: !state.isGameStart
            }
        default:
            return state;
    }
}

export default gameReducer;