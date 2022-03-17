import rule from '../../texts/rule.js'
import { useState, useRef } from 'react';

const Game = () => {

    const [inputValue, setInputValue] = useState("");
    const gameNotice = useRef(null);
    let answer = "";
    
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

    return (
        <>
            <div className="rule-box">
                {rule.map((el) => <div className="rule">{el}</div>)}
            </div>
            <div className="game-box">
                <div className="game-result" ref={gameNotice}>게임을 시작할까요?</div>
                <input placeholder="숫자를 입력해주세요." />
                <button>제시하기</button>
            </div>
        </>
    )
}

export default Game;
