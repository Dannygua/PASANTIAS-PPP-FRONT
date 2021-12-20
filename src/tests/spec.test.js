import React from 'react'
import { shallow } from 'enzyme'
import ESFOTCards from '../components/ESFOTCards'
import TableDefault from '../components/TableDefault'
import Profile from '../pages/Profile'
import { findByTest, checkProps } from '../utils'
import checkPropTypes from 'check-prop-types'
import Actions from '../components/Actions'
import ModalContext from '../context/ModalContext'
import { Data } from '../utils/index'

const setUpEsfot = (props = {}) => {
  const component = shallow(<ESFOTCards {...props} />)
  return component
}

const setUpTable = (props = {}) => {
  const component = shallow(<TableDefault {...props} />)
  return component
}

const setUpActions = (props = {}) => {
  const component = shallow(<Actions {...props} />)
  return component
}

describe('Props Components', () => {
  describe('Check PropTypes', () => {
    it('Paso de datos Correcto', () => {
      const expectedProps = {
        title: 'Anuncio',
      }
      const propsErr = checkPropTypes(checkProps(ESFOTCards, expectedProps))
      expect(propsErr).toBeUndefined()
    })

    it('Paso de datos Correcto', () => {
      const expectedProps = {
        title: 'Anuncio',
        dataSource: [
          {
            id: 1,
          },
        ],
      }
      const propsErr = checkPropTypes(checkProps(TableDefault, expectedProps))
      expect(propsErr).toBeUndefined()
    })

    it('Paso de datos Correcto', () => {
      const expectedProps = {
        form: 'CarrierForm',
      }
      const propsErr = checkPropTypes(checkProps(Actions, expectedProps))
      expect(propsErr).toBeUndefined()
    })

    it('Paso de datos Correcto', () => {
      const expectedProps = {
        setShowModal: true,
        setEdit: true,
        setForm: 'FormCarrier',
        setRegister: [
          {
            id: 1,
          },
        ],
      }
      const propsErr = checkPropTypes(checkProps(ModalContext, expectedProps))
      expect(propsErr).toBeUndefined()
    })
  })

  describe('Tiene Props', () => {
    let dataEsfot
    let dataTable
    let dataActions

    beforeEach(() => {
      const propsEsfot = {
        title: 'Tecnologia',
      }
      dataEsfot = setUpEsfot(propsEsfot)

      const propsTable = {
        title: 'Anuncio',
        dataSource: [
          {
            id: 1,
          },
        ],
      }
      dataTable = setUpTable(propsTable)

      const propsActions = {
        form: 'CarrierForm',
      }
      dataActions = setUpActions(propsActions)
    })

    it('Render sin errores', () => {
      const component = findByTest(dataEsfot, 'EsfotC')
      expect(component.length).toBe(1)
    })
    it('Render sin errores', () => {
      const component = findByTest(dataTable, 'Table')
      expect(component.length).toBe(1)
    })

    it('Render sin errores', () => {
      const component = findByTest(dataActions, 'Action')
      expect(component.length).toBe(1)
    })

    it('Render sin errores', () => {
      const component = findByTest(dataActions, 'Profile')
      expect(component.length).toBe(1)
    })
  })
})
