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
            default:
                break;
        }
    }

    useEffect(()=>{
        if(state!=='intro')
        setLabel('Next Question')

    },[state])

    return (
        <div>
            <Button onClick={handleClick}>{label}</Button>
        </div>
    )
}
