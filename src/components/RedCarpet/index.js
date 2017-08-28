import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'
import Chat from '../Chat'
import FixedButton from '../FixedButton'

const messages = [
  { bot: true, body: 'Hello!' },
  { bot: false, body: 'Hello!' },
  { bot: true, body: 'How can I help?' },
  { bot: false, body: 'I have questions...' },
  { bot: false, body: 'Lots of questions.' }
]

class RedCarpet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open || false,
      currentQuestionIndex: 0,
      messages: [{ bot: true, body: props.questions[0].text }],
      value: '',
      awaitingResponse: false,
      responses: {}
    }
  }

  getCurrentQuestion() {
    return this.props.questions[this.state.currentQuestionIndex]
  }

  _handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.sendMessage('user', this.state.value)
    }
  }

  _handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  _handleSendClick = () => {
    this.sendMessage('user', this.state.value)
  }

  _toggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }

  _handleOptionClick = option => {
    this.sendMessage('user', option)
  }

  validateMessage(message) {
    if (!message || !message.length) return false

    const currentQuestion = this.getCurrentQuestion()

    if (
      currentQuestion &&
      currentQuestion.options
      && currentQuestion.options.length
    ) {
      if (
        currentQuestion.options.map(o => o.toLowerCase())
          .includes(message.toLowerCase())
      ) {
        return true
      } else {
        this.setState({
          messages: this.state.messages.concat({
            bot: true,
            body: 'Hmm...try again?'
          }),
          value: ''
        })
        return false
      }
    }

    return true
  }

  sendMessage(from, message) {
    const valid = this.validateMessage(message)
    if (!valid) return false

    const currentQuestion = this.getCurrentQuestion()
    const responses = {
      ...this.state.responses,
      [currentQuestion.name]: message
    }

    this.setState({
      messages: this.state.messages.concat({
        bot: false,
        body: message
      }),
      awaitingResponse: true,
      value: '',
      responses
    }, () => {
      this.sendResponse(message)
      if (currentQuestion.callback) {
        currentQuestion.callback(message, responses)
      }
    })
  }

  getResponse(response, message) {
    if (!response) return null
    return {
      bot: true,
      body: typeof response === 'string' ? response : response(message)
    }
  }

  getNextQuestion() {
    return this.props.questions[this.getIndexOfNextQuestion()]
  }

  getIndexOfNextQuestion() {
    let current = this.state.currentQuestionIndex
    if (this.props.questions.length === current) return null
    return current += 1
  }

  sendResponse(message) {
    const currentQuestion = this.getCurrentQuestion()
    if (!currentQuestion) {
      this.setState({ awaitingResponse: false })
      return false
    }

    const { delay = 0, response } = currentQuestion
    const nextResponse = this.getResponse(response, message)
    const nextQuestion = this.getNextQuestion()

    let nextMessages = this.state.messages
    if (nextResponse) nextMessages.push(nextResponse)
    if (nextQuestion) nextMessages.push({ bot: true, body: this.getNextQuestion().text })

    setTimeout(() => {
      this.setState({
        messages: nextMessages,
        awaitingResponse: false,
        currentQuestionIndex: this.getIndexOfNextQuestion()
      })
    }, delay)
  }

  render() {
    const { styles, title, color, position } = this.props

    if (!this.state.open) {
      return (
        <FixedButton
          position={position}
          onClick={this._toggleOpen}
          color={color}
        />
      )
    }

    return (
      <Wrapper style={styles.container} position={position}>
        <Chat
          {...this.props}
          messages={this.state.messages}
          value={this.state.value}
          currentQuestion={this.getCurrentQuestion()}
          handleKeyPress={this._handleKeyPress}
          handleChange={this._handleChange}
          handleSendClick={this._handleSendClick}
          handleOptionClick={this._handleOptionClick}
          awaitingResponse={this.state.awaitingResponse}
          toggleOpen={this._toggleOpen}
        />
      </Wrapper>
    )
  }
}

RedCarpet.propTypes = {
  /**
   * Primary color for the Chat
   */
  color: PropTypes.string,
  /**
   * Name at the top of the chat
   */
  title: PropTypes.string,
  /**
   * Where should we position it?
   */
  position: PropTypes.oneOf([
    'bottomRight',
    'bottomLeft',
    'left',
    'right',
    'inline'
  ]),
  /**
   * Style overrides
   */
  styles: PropTypes.shape({
    container: PropTypes.object,
    chat: PropTypes.object,
    message: PropTypes.object,
    avatar: PropTypes.object
  }),
  /**
   * Avatar image for the user
   */
  UserAvatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]),
  /**
   * Bot image for the user
   */
  BotAvatar: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ])
}

RedCarpet.defaultProps = {
  color: '#5F54AE',
  title: 'Chat',
  position: 'bottomRight',
  styles: {}
}

export default RedCarpet
