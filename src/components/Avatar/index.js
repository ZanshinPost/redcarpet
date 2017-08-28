import React from 'react'
import styled from 'styled-components'
import BotSVG from '../../svg/BotSVG'
import PersonSVG from '../../svg/PersonSVG'

const Wrapper = styled.div`
  height: 35px;
  width: 35px;
  flex-shrink: 0;

  svg {
    height: 100%;
    width: 100%;
    fill: ${props => props.type === 'bot' ? '#FFF' : 'initial'};
  }
`

export default ({ type }) => (
  <Wrapper type={type}>
    {type === "bot" ? <BotSVG /> : <PersonSVG />}
  </Wrapper>
)
