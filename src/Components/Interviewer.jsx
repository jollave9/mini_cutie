import React, { useContext, useEffect, useState,useRef } from 'react'
import nod from '../assets/SPB_Nodding.gif'
import Context from '../Context/Context'

export default function Interviewer({className}) {
    const Questions = [
        "So please tell me about yourself.",
        "Tell me about a time when you demonstrated leadership.",
        "Tell me about a time when you were working with a team and faced a challenge. How did you overcome the problem?",
        "What is one of your weaknesses and how do you plan to overcome it?",
        "Now, why do you think we should hire you?"
    ]
        
    const intro = "Hi I am Patrick from CUTIE let us practice answering questions for interview..."
    const firstQuestion = Questions.shift() // tell me about yourself
    const secondQuestion = Questions[Math.floor(Math.random()*4)]
    const secondQuestionIndex = Questions.indexOf(secondQuestion)
    secondQuestionIndex!==-1 && Questions.splice(secondQuestionIndex,1)
    const thirdQuestion = Questions[Math.floor(Math.random()*3)]
    console.log(firstQuestion)
    const {state} = useContext(Context)
    const [currentQuestion,setCurrentQuestion] = useState(intro)
    // const [QuestionsArray,setQuestionsArray] = useState(Questions.current)

    useEffect(()=>{
        switch (state) {
            case 'Q1':
                setCurrentQuestion(firstQuestion)
                break;
            case 'Q2':
                setCurrentQuestion(secondQuestion)
                break;
            case 'Q3':
                setCurrentQuestion(thirdQuestion)
                break;
            default:
                break;
        }
    },[state])

    return (
        <div className={className}>
            <img src={nod} width={400}/>
            <p>{currentQuestion}</p>
        </div>
    )
}
