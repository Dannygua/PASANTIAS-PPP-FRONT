import { Form, Button, Input, Select, InputNumber } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'
import { useDataList } from '../data/useDataList'

const { Option } = Select

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

const CareerForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataSearch, isLoading, isError } = useDataList('faculties')

  const addCarrier = async (values) => {
    setIsSubmitting(true)
    await addObject('careers', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editCarrier = async (values) => {
    setIsSubmitting(true)
    await editObject('careers', values, props.register.id)
    setIsSubmitting(false)
    setShowModal(false)
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      number: '${label} is not a valid number!',
    },
  }

  return !props.edit ? (
    <Form
      onFinish={addCarrier}
      {...formItemLayout}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="faculty_id"
        label="Facultad"
        rules={[
          {
            required: true,
            message: 'Selecciona una facultad...',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Seleccione una facultad"
          loading={isLoading}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {dataSearch.map((faculty, i) => (
            <Option key={i} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombres"
        rules={[
          { required: true, message: 'Ingresa el nombre de la carrera.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pensum"
        label="Pensum"
        rules={[
          {
            required: true,
            message: 'Ingresa el pensum de la carrera.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="levels"
        label="Nivel"
        rules={[
          {
            required: true,
            type: 'number',
            message: 'Ingresa nivel de la carrera.',
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Registrar
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Form
      onFinish={editCarrier}
      validateMessages={validateMessages}
      initialValues={{
        name: props.register.name,
        pensum: props.register.pensum,
        levels: props.register.levels,
        faculty_id: props.register.faculty.id,
      }}
    >
      <Form.Item
        name="faculty_id"
        label="Facultad"
        rules={[
          {
            required: true,
            message: 'Selecciona una facultad...',
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Seleccione una facultad"
          loading={isLoading}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {dataSearch.map((faculty, i) => (
            <Option key={i} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'Ingresa el nombre de la carrera.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pensum"
        label="Pensum"
        rules={[
          {
            required: true,
            message: 'Ingresa el pensum de la carrera.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="levels"
        label="Nivel"
        rules={[
          {
            required: true,
            message: 'Ingresa el nivel de la carrera.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button class="buttonDefault" htmlType="submit" loading={isSubmitting}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CareerForm
