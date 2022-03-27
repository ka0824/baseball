interface ChangeInput {
    type: 'CHANGE_INPUT'
    inputValue: string
}

interface ChangeAnswer {
    type: 'CHANGE_ANSWER'
    answer: string
}

interface ChangeGame {
    type: 'CHANGE_GAME'
}

export const changeInput = (inputValue):ChangeInput => {
    return {
        type: 'CHANGE_INPUT',
        inputValue
    }
}

export const changeAnswer = (answer): ChangeAnswer => {
    return {
        type: 'CHANGE_ANSWER',
        answer
    }
}

export const changeGame = ():ChangeGame => {
    return {
        type: 'CHANGE_GAME',
    }
}

