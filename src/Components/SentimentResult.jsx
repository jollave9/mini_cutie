import React from 'react'

export default function SentimentResult({sentiment}) {
    console.log(sentiment)
    const s = sentiment&&JSON.parse(sentiment)
    console.log(s)
    return (
        <div>
            <h3 style={{margin: "5px 0"}} id = 'score'>Sentiment Score: {s&&s.score}</h3>
            <div style={{display: 'flex'}}>
            <div style={{flex:'1'}} >
                    <p style={{margin: "10px 0"}}>Positive Words:</p>
                    {s&&s.positive.map(x=>{
                        return(<div style={{border:'1px solid',borderRadius:'5px',width:'50%',margin:'5px 0',textAlign:'center'}}>{x}</div>)
                    })}
                </div>
                <div style={{flex:'1'}} >
                    <p style={{margin: "10px 0"}}>Negative Words:</p>
                    {s&&s.negative.map(x=>{
                        return(<div style={{border:'1px solid',borderRadius:'5px',width:'50%',margin:'5px 0',textAlign:'center'}}>{x}</div>)
                    })}
                </div>
            </div>

        </div>
    )
}
