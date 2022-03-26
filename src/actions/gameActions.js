export const changeInput = (inputValue) => {
    return {
        type: 'CHANGE_INPUT',
        inputValue
    }
}

export const changeAnswer = (answer) => {
    return {
        type: 'CHANGE_ANSWER',
        answer
    }
}

export const changeGame = () => {
    return {
        type: 'CHANGE_GAME',
    }
}