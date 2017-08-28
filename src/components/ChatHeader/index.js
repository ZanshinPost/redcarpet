import React from 'react'
import styled from 'styled-components'
import { isFullHeight } from '../../utils'

const Wrapper = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #eaebed;
  color: rgba(0, 0, 0, 0.75);
  padding: 1rem;
  border-radius: ${props => isFullHeight(props.position) ? '0' : '8px 8px 0 0'};
  display: flex;
  align-items: center;
`

const Status = styled.div`
  height: 7px;
  width: 7px;
  background: ${props => props.online ? '#50BA86' : '#E5A71D'};
  border-radius: 50%;
  margin-right: .5rem;
`

const Close = ({ onClick, color }) => (
  <svg
    onClick={onClick}
    viewBox="0 0 64 64"
    width="20"
    height="20"
    style={{ marginLeft: 'auto', cursor: 'pointer' }}
  >
    <g fill="none" stroke={color} strokeWidth="3" strokeLinecap="square" strokeMiterlimit="10">
      <path data-color="color-2" d="M44 20L20 44M44 44L20 20" />
      <circle cx="32" cy="32" r="30" />
    </g>
  </svg>
)

export default ({ position, color, children, online, toggleOpen }) => (
  <Wrapper color={color} position={position}>
    <Status online={online} />
    {children}
    <Close onClick={toggleOpen} color={color} />
  </Wrapper>
)
