import initialState from './initialState';

interface State {
    inputValue: string,
    answer: string,
    isGameStart: boolean
}

const gameReducer = (state = initialState, action):State => {
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