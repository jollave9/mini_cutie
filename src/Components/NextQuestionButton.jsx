import React,{useContext, useEffect, useState} from 'react'
import {Button} from './Button.style'
import Context from '../Context/Context'
export default function NextQuestionButton() {
    const {state,setState} = useContext(Context)
    const [label,setLabel] = useState('Start')

    const handleClick = e => {
        switch (state) {
            case 'intro':
                setState('Q1')
                break;
            case 'Q1':
                setState('Q2')
                break;
            case 'Q2':
                setState('Q3')
                break;
            case 'Q3':
                setState('Stop')
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        if(state==='Q1' || state==='Q2')
        setLabel('Next Question')
        else if(state==='Q3')
        setLabel('Stop')

    },[state])

    return (
        <div>
            <Button onClick={handleClick}>{label}</Button>
        </div>
    )
}
