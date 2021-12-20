import { Form, Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'

const SubjectForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const addTopic = async (values) => {
    setIsSubmitting(true)
    await addObject('topics', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editTopic = async (values) => {
    values['status'] = 'C'
    setIsSubmitting(true)
    await editObject('topics', values, props.register.id)
    setIsSubmitting(false)
    setShowModal(false)
  }
  return !props.edit ? (
    <Form onFinish={addTopic}>
      <Form.Item name="name" label="Nombre">
        <Input />
      </Form.Item>
      <Form.Item name="subject_id" label="Materia">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form
      onFinish={editTopic}
      initialValues={{
        name: props.register.name,
        subject_id: props.register.subject_id,
      }}
    >
      <Form.Item name="name" label="Nombre">
        <Input />
      </Form.Item>
      <Form.Item name="subject_id" label="Materia">
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

export default SubjectForm
