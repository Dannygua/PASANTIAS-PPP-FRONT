import React from 'react'
import { shallow } from 'enzyme'
import TopicPage from '../pages/TopicsPage'
import { Data, RenderPages } from '../utils'
import TopicList from '../components/TopicList'
import TopicForm from '../components/TopicForm'

const setUpPage = (props = {}) => {
  const component = shallow(<TopicPage {...props} />)
  return component
}

const setUpList = (props = {}) => {
  const component = shallow(<TopicList {...props} />)
  return component
}

const setUpForm = (props = {}) => {
  const component = shallow(<TopicForm {...props} />)
  return component
}

RenderPages(setUpPage, setUpList, setUpForm)

it('Los datos recibidos son correctos', async () => {
  const data = Data('topics')
  expect(data.dataSource[0].id).toBe(1)
  expect(data.dataSource[0].name).toBe(
    'Est dolores doloribus ut eligendi ut blanditiis.'
  )
})
