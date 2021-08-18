import styled from 'styled-components'
import Transcript from './Transcript'

export const StyledTranscript = styled(Transcript)`
    display: flex;
    flex-direction: column;
    align-items: center;
    & p{
        width: 60%;
        padding: 1rem 2rem;
        background-color: bisque;
        height:100px;
        overflow-Y:auto;
    }
    & h4{
        margin: 0;
    }
`