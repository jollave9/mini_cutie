import React from 'react'

export default function TranscriptResult({transcript}) {
    return (
        <div >
            <h3 style={{margin: "5px 0"}}>Transcript</h3>
            <p style={{width:'85%',maxHeight:'75px',overflowY:'auto'}}>{transcript}</p>
        </div>
    )
}
