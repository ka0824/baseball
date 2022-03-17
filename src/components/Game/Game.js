import rule from '../../texts/rule.js'
import { useState, useRef, useEffect } from 'react';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import '../../css/Game.css';
import image from '../../image/baseball.jpeg';

const Game = () => {

    const [inputValue, setInputValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [isGameStart, setIsGameStart] = useState(true);
    const gameNotice = useRef(null);
    const resultLog = useRef(null);

    useEffect(() => {
        setAnswer(makeAnswer());
    }, [])
    
    const makeRanNum = () => {
        return parseInt(Math.random() * 10) + "";
    }

    const makeAnswer = () => {
        let tmp = [];

        while (tmp.length < 3) {
            let ranNum = makeRanNum();
            if (!tmp.includes(ranNum)) {
                tmp.push(ranNum);
            }
        }
        return tmp.join("");
    }

    const handleInput = (value) => {
        setInputValue(value);
    }

    const handleSubmit = () => {

        if(!isGameStart) {
            if (inputValue === '1') {
                setIsGameStart(true);
                setAnswer(makeAnswer);
                deleteLog();
            } else if (inputValue === '2') {
                deleteLog();
            } 
        }

        if(!checkValidAnswer(inputValue)) {
            return gameNotice.current.textContent = '세자리 수를 입력해주세요.'
        }

        let strike = checkStrike(inputValue);
        let ball = checkBall(inputValue);
        let notice = ''

        if (strike === '3스트라이크') {
            notice = '3개의 숫자를 모두 맞히셨습니다! 게임 종료.';
            setIsGameStart(false);
        } else if (strike.length === 0 && ball.length === 0) {
            notice = '4볼';
        } else {
            notice = `${strike} ${ball}`.trim()
        }

        if (!isGameStart) {
            notice = '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.';
        }

        postLog(inputValue, notice);
        return gameNotice.current.textContent = notice;
    }

    const checkValidAnswer = (input) => {
        const regEXP = /^[0-9]{3}$/;
        
        return regEXP.test(input);
    }

    const checkStrike = (input) => {
        let count = 0;

        for (let i = 0; i <= 2; i++) {
            if (answer[i] === input[i]) {
                count++
            }
        }

        return count === 0 ? "" : `${count}스트라이크`
    }

    const checkBall = (input) => {
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

    const postLog = (number ,text) => {
        if (!isGameStart) {
            return resultLog.current.textContent += `${text}

`;
        }

        resultLog.current.textContent += `# 숫자를 입력해주세요 : ${number}
${text}

`;
    }

    const deleteLog = () => {
        return resultLog.current.textContent = "";
    }

    return (
        <div className="component-box">
            <div className="rule-box">
                <div className="game-name">야구게임</div>
                {rule.map((el, idx) => <div className="rule" key={rule + "_" + idx}>{el}</div>)}
            </div>
            <div className="game-box">
                <div className="input-box">
                    <div className="game-result" ref={gameNotice}>게임을 시작할까요?</div>
                    <input onKeyUp={(e) => handleInput(e.target.value)}/>
                    <button onClick={handleSubmit}> 
                        <SportsBaseballIcon className="icon" /> 
                    </button>
                    <img src={image} alt="" className="image" />
                </div>
                <div className="result-box" text>
                    <div className="board">전광판</div>
                    <pre className="result-log" ref={resultLog} />
                </div>
            </div>
        </div>
    )
}

export default Game;
