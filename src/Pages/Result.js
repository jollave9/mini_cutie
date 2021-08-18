import React, { useEffect, useState } from 'react'
import Header from "../Components/Header";
import VideoResult from '../Components/VideoResult'
import FaceExpressionResult from '../Components/FaceExpressionResult'
import SentimentResult from '../Components/SentimentResult'
import {ResultContainer} from './ResultContainer.style'
import TranscriptResult from '../Components/TranscriptResult';
import axios from 'axios';
function Result() {
    const [state,setState] = useState()
    useEffect(()=>{
        axios.get('http://192.168.1.8:5000/')
            .then(res=>{
                setState(res.data[res.data.length-1])
            })

    },[])

    const style = {
        display:'flex',
        width:'100vw',
        height:'100vh',
        justifyContent:'center'
    }
    
    return (
        <>
        <Header/>
        <div style={style}>
            <ResultContainer>
                <VideoResult video = {state?.video}/>
                <FaceExpressionResult faceExpression = {state?.faceExpression}/>
                <TranscriptResult transcript = {state?.transcript}/>
                <SentimentResult sentiment = {state?.sentiment}/>
            </ResultContainer>
        </div>
        </>
    )
}

export default Result
