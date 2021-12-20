import React from 'react'
import API from '../data'
import { message } from 'antd'

export const AddObject = async (url, values) => {
  message.loading({
    content: 'Guardando los datos',
  })
  console.log('Agregando', values)
  const representative = await API.post(`/${url}`, values)
  console.log(representative)
  
}

export const EditObject = async (url, values, idObject) => {
  message.loading({
    content: 'Editando los datos',
  })
  console.log('Editando', values)
  const representative = await API.put(`/${url}/${idObject}`, values)
  console.log(representative)
}
