import gameFuncs from '../funcs/gameFuncs';

describe('makeAnswer', () => {
    test('makeAnswer 함수는 문자열을 반환합니다.', () => {
        expect(typeof gameFuncs.makeAnswer()).toBe('string');
    })

    test('makeAnswer 함수가 반환하는 문자열은 길이가 3 입니다', () => {
        expect(gameFuncs.makeAnswer().length).toBe(3);
    })

    test('makeAnswer 함수가 반환하는 문자열은 각기 다른 3자리 숫자로 이루어져 있습니다.', () => {
        const answer = gameFuncs.makeAnswer().split("");
        const [num1, num2, num3] = answer;
        let result;
        result = num1 === num2 || num1 === num3 || num2 === num3;

        expect(result).toBe(false);
    })
})

describe('checkAnswer', () => {
    const answer = '123';
    const checkList = new Array(3).fill(false);

    test('답이 123일 때, 456을 입력하면 빈 문자열이 반환되야 합니다.', () => {
        expect(`${gameFuncs.checkStrike('456', '123')} ${gameFuncs.checkBall('456', '123')}`.trim())
            .toBe("");
    })  

    test('답이 123일 때, 132을 입력하면 1스트라이크 2볼이 반환되야 합니다.', () => {
        expect(`${gameFuncs.checkStrike('132', '123')} ${gameFuncs.checkBall('132', '123')}`.trim())
            .toBe("1스트라이크 2볼");
    })

    test('답이 123일 때, 123을 입력하면 3스트라이크이 반환되야 합니다', () => {
        expect(`${gameFuncs.checkStrike('123', '123')} ${gameFuncs.checkBall('123', '123')}`.trim())
            .toBe("3스트라이크");
    })
})