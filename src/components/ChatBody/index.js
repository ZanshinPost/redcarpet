import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Message from '../Message'
import Option from '../Option'
import Ellipses from '../Ellipses'

class ChatBody extends PureComponent {
  renderMessages(messages) {
    return messages.map((m, i) => (
      <Message
        key={`message-${i}`}
        left={m.bot}
        color={this.props.color}
      >
        {m.body}
      </Message>
    ))
  }

  render() {
    const {
      messages,
      awaitingResponse,
      color,
      currentQuestion,
      handleOptionClick
     } = this.props

    return (
      <Wrapper>
        {this.renderMessages(messages)}
        <div style={{ display: 'flex' }}>
          {
            currentQuestion && !awaitingResponse &&
            currentQuestion.options.map((o, i) =>
              <Option
                key={`${o}-${i}`}
                onClick={() => handleOptionClick(o)}
                left
                color={color}
              >
                {o}
              </Option>
            )
          }
        </div>
        {
          awaitingResponse &&
          <Message left color={color} style={{ wordBreak: 'initial' }}>
            <Ellipses />
          </Message>
        }
      </Wrapper>
    )
  }
}

export default ChatBody
