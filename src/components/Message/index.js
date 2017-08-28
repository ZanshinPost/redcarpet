import React from 'react'
import styled from 'styled-components'
import Avatar from '../Avatar'

const Wrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: ${props => props.left ? 'flex-start' : 'flex-end'};
  flex-flow: ${props => props.left ? 'row' : 'row-reverse'};
  margin-bottom: 1rem;
  max-width: 80%;
`

export const ChildrenWrapper = styled.div`
  margin: 0 10px;
  padding: .5rem 1rem;
  background: ${props => props.left ? props.color : '#FFF'};
  color: ${props => props.left ? '#FFF' : 'inherit'};
  border-radius: ${props => props.left ? '0 18px 18px 18px' : '18px 0 18px 18px'};
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  max-width: 100%;
  min-width: 60px;
  word-break: break-word;
`

export default props => (
  <Wrapper {...props}>
    <Avatar type={props.left ? 'bot' : 'user'} />
    <ChildrenWrapper {...props}>
      {props.children}
    </ChildrenWrapper>
  </Wrapper>
)
