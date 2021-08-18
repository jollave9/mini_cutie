import React from 'react'

export default function VideoResult({video}) {
    return (
        <div>
            <video src={video} controls width={480}></video>
        </div>
    )
}
