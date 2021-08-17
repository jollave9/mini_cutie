import styled from 'styled-components'
import Transcript from './Transcript'

export const StyledTranscript = styled(Transcript)`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    /* border: 1px solid; */
    & p{
        width: 60%;
        padding: 1rem;
        background-color: bisque;
        height:100px;
        overflow-Y:auto;
    }
    & h3{
        margin: 0;
    }
`