import React from 'react'
import { shallow } from 'enzyme'
import SubjectPage from '../pages/SubjectsPage'
import { Data, RenderPages } from '../utils'
import SubjectList from '../components/SubjectList'
import SubjectForm from '../components/SubjectForm'

const setUpPage = (props = {}) => {
  const component = shallow(<SubjectPage {...props} />)
  return component
}

const setUpList = (props = {}) => {
  const component = shallow(<SubjectList {...props} />)
  return component
}

const setUpForm = (props = {}) => {
  const component = shallow(<SubjectForm {...props} />)
  return component
}

RenderPages(setUpPage, setUpList, setUpForm)

it('Los datos recibidos son correctos', async () => {
  const data = Data('subjects')
  expect(data.dataSource[0].id).toBe(1)
  expect(data.dataSource[0].name).toBe('Nobis ducyyyyy')
  expect(data.dataSource[0].code).toBe('aaff0334')
  expect(data.dataSource[0].level).toBe(4)
  expect(data.dataSource[0].unit).toBe(
    'Commodi aliquid labore dolores occaecati porro ab'
  )
  expect(data.dataSource[0].field).toBe(
    'Qui quis maiores cumque nihil reiciendis'
  )
})
