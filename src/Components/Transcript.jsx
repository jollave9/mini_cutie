import React, { useEffect, useRef } from 'react'
import NextQuestionButton from './NextQuestionButton'
export default function Transcript({className}) {
    const pref = useRef(null)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    let recognition = new SpeechRecognition();
    console.log(recognition)
    recognition.onresult = e => {

        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
        console.log(e.results)
        pref.current.innerHTML += ` ${transcript}`
        pref.current.scrollTop = pref.current.scrollHeight
    
    }

    recognition.onend = e => recognition.start()

    useEffect(()=>{
        recognition.start()
    },[])
    return (
        <div className={className}>
            <h3>Transcript</h3>
            <p ref={pref}></p>
            <NextQuestionButton/>
        </div>
    )
}
