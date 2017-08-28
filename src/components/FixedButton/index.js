import React from 'react'
import styled, { css } from 'styled-components'
import { isFullHeight } from '../../utils'
import SendSVG from '../../svg/SendSVG'

const Wrapper = styled.div`
  position: ${props => props.position !== 'inline' ? 'fixed' : 'relative'};
  background: ${props => props.color};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: #FFF;
  }

  ${props => props.position === 'right' && css`
    bottom: 1rem;
    right: 1rem;
	`}

  ${props => props.position === 'left' && css`
    bottom: 1rem;
    left: 1rem;
	`}

  ${props => props.position === 'bottomRight' && css`
    bottom: 1rem;
    right: 1rem;
	`}

  ${props => props.position === 'bottomLeft' && css`
    bottom: 1rem;
    left: 1rem;
	`}
`

export default props => (
  <Wrapper {...props}>
    <SendSVG />
  </Wrapper>
)
