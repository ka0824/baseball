import rule from '../../texts/rule.js'
import { useRef, useState } from 'react';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import '../../css/Game.css';
import image from '../../image/baseball.jpeg';
import gameFuncs from '../../funcs/gameFuncs.js'
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, changeAnswer, changeGame } from '../../actions/gameActions';

const Game = () => {
    
    const dispatch = useDispatch();
    const inputValue = useSelector(state => state.inputValue);
    const answer = useSelector(state => state.answer);
    const isGameStart = useSelector(state => state.isGameStart);
    const gameNotice = useRef(null);
    const resultLog = useRef(null);
    const { makeAnswer, checkValidAnswer, checkStrike, checkBall } = gameFuncs;

    const handleInput = (value) => {
        dispatch(changeInput(value));
    }

    const handleSubmit = () => {
        console.log(answer);
        if(!isGameStart) {
            if (inputValue === '1') {
                dispatch(changeGame())
                dispatch(changeAnswer(makeAnswer()));
                deleteLog();
            } else if (inputValue === '2') {
                deleteLog();
            } else {
                return;
            }
        }

        if(!checkValidAnswer(inputValue)) {
            return gameNotice.current.textContent = '세자리 수를 입력해주세요.'
        }

        let strike = checkStrike(inputValue, answer);
        let ball = checkBall(inputValue, answer);
        let notice = ''

        if (strike === '3스트라이크') {
            notice = '3개의 숫자를 모두 맞히셨습니다! 게임 종료.';
            dispatch(changeGame());
        } else if (strike.length === 0 && ball.length === 0) {
            notice = '4볼';
        } else {
            notice = `${strike} ${ball}`.trim()
        }

        if (!isGameStart) {
            notice = '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.';
        }
        postLog(inputValue, notice);
        scrollToBottom();
        return gameNotice.current.textContent = notice;
    }

    const postLog = (number ,text) => {

        if (!isGameStart) {
            return resultLog.current.textContent += `${text}
            
`;
        }

        return resultLog.current.textContent += `# 숫자를 입력해주세요 : ${number}
${text}

`;
    }

    const deleteLog = () => {
        return resultLog.current.textContent = "";
    }

    const scrollToBottom = () => {
        return resultLog.current.scrollTop = resultLog.current.scrollHeight;
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
                    <input onBlur={(e) => handleInput(e.target.value)}/>
                    <button onClick={handleSubmit}> 
                        <SportsBaseballIcon className="icon" /> 
                    </button>
                    <img src={image} alt="" className="image" />
                </div>
                <div className="result-box">
                    <div className="board">전광판</div>
                    <pre className="result-log" ref={resultLog} />
                </div>
            </div>
        </div>
    )
}

export default Game;
