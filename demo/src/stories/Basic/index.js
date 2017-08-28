import React from 'react'
import { Story, Demo, PropsTable } from 'react-story'
import RedCarpet, { Question } from '../../../../src'
import RedCarpetRaw from '!raw-loader!../../../../src/components/RedCarpet'
import code from './code.md'

const questions = [
  {
    name: 'language', // str
    text: "What language does your app run?", // string or func(value, state)
    component: null, // class
    response: (value, state) => `We love ${value}!`, // string or func(value, state),
    badResponse: null, // when the user picks an invalid option
    options: ['Ruby', 'Elixir', 'Node', 'Other'], // arr
    validation: null, // validation function for response
    children: [], // arr
    callback: () => {}, // func
    delay: 1000 // number
  },
  {
    name: 'platform', // str
    text: "Where are you hosted?", // string or func(value, state)
    component: null, // class
    response: () => {}, // string or func(value, state)
    options: ['Heroku', 'AWS', 'Google Cloud', 'Other'], // arr
    validation: null, // validation function for response
    children: [], // arr
    callback: (value, state) => console.log(value, state), // func
    delay: 1000 // number
  }
]

const BasicDemo = () => (
  <Demo
    name="Chat Demo"
    desc="Here's some demos."
    code={code}
  >
    <RedCarpet
      position="inline"
      title="Inline Demo"
      open
      questions={questions}
    />
  </Demo>
)

const StoryComponent = () => (
  <Story>
    <BasicDemo />
    <PropsTable
      demonstrating={RedCarpet}
      raw={RedCarpetRaw}
    />
  </Story>
)

export default {
  name: 'Basic',
  component: StoryComponent
}
