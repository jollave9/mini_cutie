import React, { useEffect, useRef,useContext, useState} from 'react'
import NextQuestionButton from './NextQuestionButton'
import Context from "../Context/Context";

export default function Transcript({className}) {
    
    const {state,setData} = useContext(Context)
    const pref = useRef(null)
    const Transcript = useRef('')

    const recognition = useRef(null)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition;
    
    recognition.current = new SpeechRecognition()
    recognition.current.onresult = e => {

        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
        console.log(e.results)
        pref.current.innerHTML += ` ${transcript}`
        pref.current.scrollTop = pref.current.scrollHeight
        Transcript.current += ` ${transcript}`
    
    }

    useEffect(()=>{


        recognition.current.onend = e =>{
            if(state!=='Stop')
            recognition.current.start()
        }

        if(state==='Q1'){
            recognition.current.start()
        }
        if(state==='Stop'){
            recognition.current.stop()
            setData(Transcript.current)
        }


    },[state])

    return (
        <div className={className}>
            <h4>Transcript</h4>
            <p ref={pref}></p>
            <NextQuestionButton/>
        </div>
    )
}
