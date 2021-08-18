import React from 'react'

export default function FaceExpressionResult({faceExpression}) {
    const fe = faceExpression&&JSON.parse(faceExpression)
    let colors = {
        angry: 'red',
        disgusted:'violet',
        fearful:'orange',
        happy:'green',
        sad:'blue',
        surprised:'yellow',
        neutral:'grey'
    }
    console.log(fe)
    let total = 0
    fe&&Object.keys(fe).map(x=>total+=fe[x])
    console.log(total)

    return (
        <div>
            <h3 style={{margin:'5px 0'}}>Facial Expressions</h3>
            {fe&&Object.keys(fe).map(x=>{
                if(x!=='undefined')
                return(
                <>
                    <p style={{margin:'10px 0'}}>{x}</p>
                    <div style={{
                        backgroundColor:colors[x],
                        height: '5px',
                        width:(fe[x]/total)*100 + '%'
                    }}></div>
                </>
                )
            })}
        </div>
    )
}
