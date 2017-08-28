import React from 'react'
import styled from 'styled-components'
import SendSVG from '../../svg/SendSVG'

const Input = styled.input`
  background: #FFF;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1rem;
  box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
  height: 45px;
  outline: none;
  font-size: 1rem;
  width: 100%;
`

const Wrapper = styled.div`
  position: relative;
  margin: 1rem;
`

const Send = styled.div`
  position: absolute;
  right: .5rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: #FFF;

  svg { opacity: .5 }
  &:hover svg { opacity: 1 }
`

export default props => (
  <Wrapper>
    <Input {...props} />
    <Send onClick={props.handleSendClick}>
      <SendSVG />
    </Send>
  </Wrapper>
)
