import API from '../data'
import { message } from 'antd'
import { mutate } from 'swr'
import { translateMessage } from './translateMessage'

import React from 'react'
import ErrorList from '../components/ErrorList'
export const addObject = async (url, values) => {
  const hide = message.loading({
    content: "Enviando Datos",
    
  })

  try {
    console.log('Agregando', values)
    await API.post(`/${url}`, values)
    await mutate(`/${url}`)
    hide()
  message.info('Datos Enviados con exito')

  } catch (e) {
    const errorList = e.error && <ErrorList errors={e.error} />
    message.error(
      <>
        {translateMessage(e.message)}
        {errorList}
      </>
    )
    hide()
  }
}

export const editObject = async (url, values, idObject) => {
  const hide = message.loading({
    content: 'Editando los datos',
  })
  try {
    console.log('Editando', values)
    await API.put(`/${url}/${idObject}`, values)
    await mutate(`/${url}`)
    hide()
  } catch (e) {
    const errorList = e.error && <ErrorList errors={e.error} />
    message.error(
      <>
        {translateMessage(e.message)}
        {errorList}
      </>
    )
    hide()
  }
}

export const deleteObject = async (url, idObject) => {
  const hide = message.loading({
    content: 'Eliminando dato',
  })

  try {
    console.log('Eliminando dato', idObject)
    await API.put(`/${url}/${idObject}/disabled`)
    await mutate(`/${url}`)
    hide()
  } catch (e) {
    const errorList = e.error && <ErrorList errors={e.error} />
    message.error(
      <>
        {translateMessage(e.message)}
        {errorList}
      </>
    )
    hide()
  }
}

export const RecoverData = async (alert,alert2,url, values) => {
  const hide = message.loading({
    content: alert,
    
  })

  try {
    console.log('Agregando', values)
    await API.post(`/${url}`, values)
    await mutate(`/${url}`)
    hide()
  message.info('Datos Enviados con exito')
  message.info(alert2)

  } catch (e) {
    const errorList = e.error && <ErrorList errors={e.error} />
    message.error(
      <>
        {translateMessage(e.message)}
        {errorList}
      </>
    )
    hide()
  }
}

export const EditPassword = async (url, values, idObject) => {
  const hide = message.loading({
    content: 'Editando los datos',
  })
  try {
    console.log('Editando', values)
    await API.put(`/${url}/${idObject}`, values)
    await mutate(`/${url}`)
    message.info('Datos Enviados con exito')
    message.info('Contraseña Cambiada')
    hide()
  } catch (e) {
    const errorList = e.error && <ErrorList errors={e.error} />
    message.error(
      <>
        {translateMessage(e.message)}
        {errorList}
      </>
    )
    hide()
  }
}