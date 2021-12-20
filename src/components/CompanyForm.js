/**
 * Created by chalosalvador on 9/13/20
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

const CompanyForm = ({ form, onSubmit, company }) => {
  return (
    <Form
      {...formItemLayout}
      name="company"
      onFinish={onSubmit}
      form={form}
      initialValues={company}
      onFieldsChange={() =>
        console.log('form.getFieldsError()', form.getFieldsError(['city']))
      }
    >
      <Form.Item
        label="RUC"
        name="ruc"
        placeholder="Ingresa el RUC de la empresa donde realizarás tus prácticas"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Ingresa el ruc de la empresa.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Ingresa el nombre de la empresa.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Dirección"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Ingresa la dirección de la empresa.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="Ciudad"
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Ingresa la ciudad de la empresa.',
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
            whitespace: true,
            message: 'Ingresa el correo de la empresa.',
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
            whitespace: true,
            message: 'Ingresa un número de contacto de la empresa.',
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
        name="type"
        label="Tipo"
        rules={[
          {
            required: true,
            message: 'Selecciona el tipo de empresa.',
          },
        ]}
      >
        <Select placeholder="Selecciona...">
          <Option value="pública">Pública</Option>
          <Option value="privada">Privada</Option>
          <Option value="organismo internacional">
            Organismo internacional
          </Option>
          <Option value="tercer sector">Tercer sector</Option>
          <Option value="otras">Otras</Option>
        </Select>
      </Form.Item>
    </Form>
  )
}

export default CompanyForm
