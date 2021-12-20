/**
 * Created by chalosalvador on 9/14/20
 */
import React from 'react'
import { Form, Input, Select } from 'antd'

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

const RepresentativeForm = ({ form, onSubmit, representative }) => {
    console.log("///////////////->>>>");
    console.log(form);
    console.log(onSubmit);
    console.log(representative);
  return (
    <Form
      {...formItemLayout}
      name="representative"
      onFinish={onSubmit}
      form={form}
      initialValues={representative}
    >
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            required: true,
            message: 'Ingresa el nombre.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Apellido"
        rules={[
          {
            required: true,
            message: 'Ingresa el apellido.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="job_title"
        label="Cargo"
        rules={[
          {
            required: true,
            message: 'Ingresa el cargo que tiene en la empresa.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Correo"
        rules={[
          {
            required: true,
            message: 'Ingresa el correo del representante.',
          },
          {
            type: 'email',
            message: 'Ingresa un correo electrónico válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Teléfono 1"
        rules={[
          {
            required: true,
            message: 'Ingresa un número de contacto.',
          },
          {
            pattern: new RegExp('^\\d{7,}$'),
            message: 'Ingresa un número de teléfono válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="mobile"
        label="Teléfono 2"
        rules={[
          {
            pattern: new RegExp('^\\d{7,}$'),
            message: 'Ingresa un número de teléfono válido.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="sex"
        label="Género"
        rules={[
          {
            required: true,
            message: 'Selecciona el género.',
          },
        ]}
      >
        <Select placeholder="Selecciona...">
          <Option value="male">Masculino</Option>
          <Option value="female">Femenino</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export default RepresentativeForm
