import React from 'react'
import { shallow } from 'enzyme'
import EsfotCards from '../components/ESFOTCards'
import { findByTest } from '../utils'

const setUp = (props = {}) => {
  const component = shallow(<EsfotCards {...props} />)
  return component
}

describe('Components', () => {
  let component
  beforeEach(() => {
    component = setUp()
  })

  it('Render sin Problemas', () => {
    const wrapper = findByTest(component, 'EsfotC')
    expect(wrapper.length).toBe(1)
  })

  it('Render Img sin Problemas', () => {
    const wrapper = findByTest(component, 'Anuncio')
    expect(wrapper.length).toBe(1)
  })
})
