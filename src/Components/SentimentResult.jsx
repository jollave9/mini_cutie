import React from 'react'
const style = {
    h3:{
        margin: "5px 0"
    },
    container:{
        display: 'flex'
    },
    words:{
        flex:'1'
    },
    p:{
        margin: "10px 0"
    },
    word:{
        border:'1px solid',
        borderRadius:'5px',
        width:'50%',
        margin:'5px 0',
        textAlign:'center'
    }
}
export default function SentimentResult({sentiment}) {
    console.log(sentiment)
    const s = sentiment&&JSON.parse(sentiment)
    console.log(s)
    return (
        <div>
            <h3 style={style.h3} id = 'score'>Sentiment Score: {s&&s.score}</h3>
            <div style={style.container}>
            <div style={style.words} >
                    <p style={style.p}>Positive Words:</p>
                    {s&&s.positive.map(x=>{
                        return(<div style={style.word}>{x}</div>)
                    })}
                </div>
                <div style={{flex:'1'}} >
                    <p style={style.p}>Negative Words:</p>
                    {s&&s.negative.map(x=>{
                        return(<div style={style.word}>{x}</div>)
                    })}
                </div>
            </div>

        </div>
    )
}
