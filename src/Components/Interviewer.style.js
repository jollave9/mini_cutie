import styled from 'styled-components'
import Interviewer from './Interviewer'

export const StyledInterviewer = styled(Interviewer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    & p{
        max-width: 60%;
    }
`