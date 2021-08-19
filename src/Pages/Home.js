import React from 'react'
import Header from "../Components/Header";
import {HomeContainer} from './HomeContainer.style'
import {StyledVideo} from '../Components/Video.style'
import {StyledInterviewer} from '../Components/Interviewer.style'
import {StyledTranscript} from '../Components/Transcript.style'
import { Container } from "./Container.style";
export default function Home() {
    return (
        <>
            <Header/>
            <HomeContainer>
                <StyledVideo/>
                <Container>
                    <StyledInterviewer/>
                    <StyledTranscript/>
                </Container>
            </HomeContainer>
        </>
    )
}
