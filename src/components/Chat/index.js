import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import ChatHeader from '../ChatHeader'
import ChatBody from '../ChatBody'
import ChatInput from '../ChatInput'

class Chat extends PureComponent {

  componentDidUpdate(prevProps) {
    // When a new message is added, ensure the chat stays scrolled to bottom
    if (prevProps.messages.length !== this.props.messages.length) {
      const body = ReactDOM.findDOMNode(this.ChatBody)
      body.scrollTop = body.scrollHeight + body.offsetHeight;
    }
  }

  render() {
    const {
      color,
      title,
      messages,
      value,
      position,
      currentQuestion,
      handleKeyPress,
      handleChange,
      handleSendClick,
      handleOptionClick,
      awaitingResponse,
      toggleOpen
    } = this.props

    return (
      <Wrapper>
        <ChatHeader
          color={color}
          online={true}
          position={position}
          toggleOpen={toggleOpen}
        >
          {title}
        </ChatHeader>
        <ChatBody
          ref={ref => this.ChatBody = ref }
          color={color}
          messages={messages}
          currentQuestion={currentQuestion}
          awaitingResponse={awaitingResponse}
          handleOptionClick={handleOptionClick}
        />
        <ChatInput
          placeholder="Type your message here..."
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          handleSendClick={handleSendClick}
          value={value}
        />
      </Wrapper>
    )
  }
}

export default Chat
