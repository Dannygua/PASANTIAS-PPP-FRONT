import React from 'react'
import { shallow } from 'enzyme'
import CarrierPage from '../pages/CarrierPage'
import { Data, RenderPages } from '../utils'
import FacultiesList from '../components/FacultiesList'
import FacultiesForm from '../components/FacultiesForm'
import FacultiesPage from '../pages/Faculties'

const setUpPage = (props = {}) => {
  const component = shallow(<FacultiesPage {...props} />)
  return component
}

const setUpList = (props = {}) => {
  const component = shallow(<FacultiesList {...props} />)
  return component
}

const setUpForm = (props = {}) => {
  const component = shallow(<FacultiesForm {...props} />)
  return component
}

RenderPages(setUpPage, setUpList, setUpForm)

it('Los datos recibidos son correctos', async () => {
  const data = Data('faculties')
  expect(data.dataSource[0].id).toBe(1)
  expect(data.dataSource[0].name).toBe('Bellhopssss')
})
