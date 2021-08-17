import React,{useRef,useEffect,useState} from 'react'
import * as faceapi from 'face-api.js'

export default function Video({className}) {
    const videoWidth = 640
    const videoHeight = 480
    const [faceExpressionsCount,setfaceExpressionsCount] = useState({
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

    
    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
        })
        .catch(err => {
          console.error("error:", err);
        });
    }
    const handlePLay = ()=>{
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current)
        const displaySize = { width: videoWidth, height: videoHeight }
        faceapi.matchDimensions(canvasRef.current, displaySize)
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            setfaceExpressionsCount(faceExpressionsCount[detections[0]?.expressions.asSortedArray()[0].expression]++)
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight)
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections)
            faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections)
            faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections)
            console.log(faceExpressionsCount)
        }, 1000)
    }

    useEffect(()=>{
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
            ]).then(startVideo)
    },[])
    
    return (
        <div className={className}>
            <video autoPlay muted ref={videoRef} width={videoWidth} height={videoHeight} onPlay={handlePLay}></video>
            <canvas ref={canvasRef} style={{position:'absolute'}}></canvas>
        </div>
    )
}
