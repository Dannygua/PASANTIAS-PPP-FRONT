import checkPropTypes from 'check-prop-types'

export const findByTest = (component, datatest) => {
  const wrapper = component.find(`[data-test='${datatest}']`)
  return component
}

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  )
  return propsErr
}
