import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";

const Quiz = ({ info, qdata, setQdata }) => {
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState(['a','a','a','a','a']);
    const [result, setResult] = useState(-1);
    const [column, SetColumn] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    let count = 0;

    useEffect(() => {
        setQuestions(qdata);
        console.log(qdata);
    }, [qdata]);

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const Answer = (val, val_2) => {
        setUserAnswers(prev => {
            prev[val_2] = val;
            return [...prev]
        })
    };

    const giveOutput = () => {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].que_ans === userAnswers[i]) {
                count++;
            }
        }
        setResult(count);
    }

    return (
        <div className="quiz_background">
            <div className="quiz_Container">
                <div className="quiz_padding">
                    <div className="quiz_Heading">Quiz</div>
                    <hr className="quiz_line" />
                    <div className="quiz_question">{questions[currentQuestionIndex]?.question}</div>
                    <div className="quiz_options">
                        <div className="quiz_option" onClick={() => Answer('a', currentQuestionIndex)} ><label>{questions[currentQuestionIndex]?.['options']?.['a']}</label></div>
                        <div className="quiz_option" onClick={() => Answer('b', currentQuestionIndex)} ><label>{questions[currentQuestionIndex]?.['options']?.['b']}</label></div>
                        <div className="quiz_option" onClick={() => Answer('c', currentQuestionIndex)} ><label>{questions[currentQuestionIndex]?.['options']?.['c']}</label></div>
                        <div className="quiz_option" onClick={() => Answer('d', currentQuestionIndex)} ><label>{questions[currentQuestionIndex]?.['options']?.['d']}</label></div>
                    </div>
                    <div className="quiz_centralize">
                        {currentQuestionIndex > 0 && <div className="quiz_next" onClick={handlePrevQuestion}>Prev</div>}
                        {
                            currentQuestionIndex < questions.length - 1 ?
                                <div className="quiz_next" onClick={handleNextQuestion}>Next</div> :
                                <div className="quiz_next" onClick={giveOutput}>Finish</div>
                        }
                    </div>
                    {result >= 0 && <div>Score : {result}/{questions.length}</div>}
                </div>
            </div>
        </div>)
}

export default Quiz;



