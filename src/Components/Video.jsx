import React,{useRef,useEffect,useState,useContext} from 'react'
import * as faceapi from 'face-api.js'
import Context from "../Context/Context";
import RecordRTC from 'recordrtc';
import axios from 'axios';
import { Redirect } from "react-router-dom";

export default function Video({className}) {
    const {state,data} = useContext(Context)
    const [intervalId,setIntervalId] = useState()
    const [redirect,setRedirect] = useState(false)

    const videoWidth = 640
    const videoHeight = 480
    let faceExpressionsCount = useRef({
      angry: 0,
      disgusted: 0,
      fearful: 0,
      happy: 0,
      neutral: 0,
      sad: 0,
      surprised: 0,
    }) 
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    var recorder = useRef(null)
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          recorder.current = RecordRTC(stream, {
            type: 'video'
          });
        })
        .catch(err => {
          console.error("error:", err);
        });
    }
    const displaySize = { width: videoWidth, height: videoHeight }

    let IntervalFunction = async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      faceExpressionsCount.current[detections[0]?.expressions.asSortedArray()[0].expression]++
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
  }

  let IntervalID
    const startFaceAPI = ()=>{
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
        faceapi.matchDimensions(canvasRef.current, displaySize)
        IntervalID = setInterval(IntervalFunction, 1000)
        setIntervalId(IntervalID)
    }

    useEffect(()=>{
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]).then(startVideo)
    },[])
    
    useEffect(()=>{
      state==='Q1'&&startFaceAPI()
      state==='Q1'&&recorder.current.startRecording()
      if(state==='Stop'){
        canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
        clearInterval(intervalId)
        console.log(faceExpressionsCount.current)
      }

    },[state])

    useEffect(()=>{

        data && recorder.current.stopRecording(function() {
          var formData = new FormData();   
          let blob = recorder.current.getBlob();
          console.log(data)
          formData.append('transcript', data);
          formData.append("faceExpressions", JSON.stringify(faceExpressionsCount.current));
          formData.append("videoRecording", blob);
          const config = {     
            headers: { 'content-type': 'multipart/form-data' }
          }
          axios.post('http://localhost:5000/',formData,config)
          setRedirect(true)
      })

    },[data])

    if(redirect)
    return <Redirect to='/result'/>
    else
    return (
        <div className={className}>
            <video autoPlay muted ref={videoRef} width={videoWidth} height={videoHeight}></video>
            <canvas ref={canvasRef} style={{position:'absolute'}}></canvas>
        </div>
    )
}
