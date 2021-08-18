import React, {useState} from 'react'
import Header from "../Components/Header";
import {HomeContainer} from './HomeContainer.style'
import {StyledVideo} from '../Components/Video.style'
import {StyledInterviewer} from '../Components/Interviewer.style'
import {StyledTranscript} from '../Components/Transcript.style'
import { Container } from "./Container.style";
import Context from '../Context/Context'
export default function Home() {

    const [state,setState] = useState('intro')
    const [data,setData] = useState('')

    return (
        <>
            <Header/>
            <Context.Provider value={{state,setState,data,setData}}>
            <HomeContainer>
                <StyledVideo/>
                <Container>
                    <StyledInterviewer/>
                    <StyledTranscript/>
                </Container>
            </HomeContainer>
            </Context.Provider>
        </>
    )
}
