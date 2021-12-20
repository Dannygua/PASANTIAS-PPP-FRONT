import { Form, Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'

const formItemLayout = {
  labelCol: {
    xs: { span: 18 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}

const FacultiesForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addFaculty = async (values) => {
    setIsSubmitting(true)
    await addObject('faculties', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editFaculty = async (values) => {
    setIsSubmitting(true)
    await editObject('faculties', values, props.register.id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  return !props.edit ? (
    <Form onFinish={addFaculty} {...formItemLayout}>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'Ingresa el nombre de la facultad.' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form onFinish={editFaculty} initialValues={{ name: props.register.name }}>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'Ingresa el nombre de la facultad.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FacultiesForm
