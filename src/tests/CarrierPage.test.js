import React, { useContext } from 'react'
import { shallow } from 'enzyme'
import CarrierPage from '../pages/CarrierPage'
import { Data, RenderPages } from '../utils'
import CarrierList from '../components/CarrierList'
import CarrierForm from '../components/CarrierForm'
import { useDataList } from '../data/useDataList'

const setUpPage = (props = {}) => {
  const component = shallow(<CarrierPage {...props} />)
  return component
}

const setUpList = (props = {}) => {
  const component = shallow(<CarrierList {...props} />)
  return component
}

const setUpForm = (props = {}) => {
  const component = shallow(<CarrierForm {...props} />)
  return component
}

RenderPages(setUpPage, setUpList, setUpForm)

it('Los datos recibidos son correctos', async () => {
  const data = Data('careers')
  expect(data.dataSource[0].id).toBe(1)
  expect(data.dataSource[0].name).toBe('Bellhops')
  expect(data.dataSource[0].pensum).toBe(1997)
  expect(data.dataSource[0].levels).toBe(5)
  expect(data.dataSource[0].faculty_id).toBe(1)
})
