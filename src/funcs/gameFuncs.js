const gameFuncs = {
    makeRanNum: () => {
        return parseInt(Math.random() * 10) + "";
    },
    makeAnswer: () => {
        let tmp = [];
    
        while (tmp.length < 3) {
            let ranNum = gameFuncs.makeRanNum();
            if (!tmp.includes(ranNum)) {
                tmp.push(ranNum);
            }
        }
        return tmp.join("");
    },
    checkValidAnswer: (input) => {
        const regEXP = /^[0-9]{3}$/;
        
        return regEXP.test(input);
    },
    checkStrike: (input, answer) => {
        let count = 0;

        for (let i = 0; i <= 2; i++) {
            if (answer[i] === input[i]) {
                count++
            }
        }

        return count === 0 ? "" : `${count}스트라이크`
    },
    checkBall : (input, answer) => {
        let count = 0;
        const checkedList = [];

        for (let i = 0; i <= 2; i++) {

            if (answer.indexOf(input[i]) === -1) {
                continue;
            }

            if (answer.indexOf(input[i]) !== i && !checkedList.includes(input[i])) {
                count++
            } else if (input[i] === answer[i] && checkedList.includes(input[i])) {
                count--;
            }
            checkedList.push(input[i])
        }
        return count === 0 ? "" : `${count}볼`
    }

}

export default gameFuncs;