import React from 'react'
const style = {
    h3:{
        margin: "5px 0"
    },
    p:{
        width:'85%',
        maxHeight:'75px',
        overflowY:'auto'
    }
}
export default function TranscriptResult({transcript}) {
    return (
        <div >
            <h3 style={style.h3}>Transcript</h3>
            <p style={style.p}>{transcript}</p>
        </div>
    )
}
