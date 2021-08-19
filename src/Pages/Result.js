import React, { useEffect, useState } from 'react'
import Header from "../Components/Header";
import VideoResult from '../Components/VideoResult'
import FaceExpressionResult from '../Components/FaceExpressionResult'
import SentimentResult from '../Components/SentimentResult'
import {ResultContainer} from './ResultContainer.style'
import TranscriptResult from '../Components/TranscriptResult';
import axios from 'axios';
import { useLocation } from "react-router-dom";

function Result() {
    
    let location = useLocation()
    const [result,setResult] = useState()
    
    useEffect(()=>{
        setTimeout(()=>{
            axios.get('http://localhost:5000/')
            .then(res=>{
                setResult(res.data[res.data.length-1])
            })
        },1000)
    },[location])

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
                <VideoResult video = {result?.video}/>
                <FaceExpressionResult faceExpression = {result?.faceExpression}/>
                <TranscriptResult transcript = {result?.transcript}/>
                <SentimentResult sentiment = {result?.sentiment}/>
            </ResultContainer>
        </div>
        </>
    )
}

export default Result
