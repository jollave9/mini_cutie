import React, {useState} from 'react'
import logo from '../assets/CUTIE_LOGO.png'
import {HomeContainer} from './HomeContainer.style'
import {StyledVideo} from '../Components/Video.style'
import {StyledInterviewer} from '../Components/Interviewer.style'
import {StyledTranscript} from '../Components/Transcript.style'
import { Container } from "./Container.style";
import Context from '../Context/Context'
export default function Home() {

    const [state,setState] = useState('intro')

    return (
        <>
            <header><img src={logo} width={100} style={{margin:'0 30px'}}/></header>
            <Context.Provider value={{state,setState}}>
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
