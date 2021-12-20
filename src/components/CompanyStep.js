/**
 * Created by chalosalvador on 9/14/20
 */
import React, { useState } from 'react'
import CompanyForm from './CompanyForm'
import API from '../data'
import { Alert, Button, Col, Form, Input, Row } from 'antd'

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

const CompanyStep = ({ form, onSubmit }) => {
  const [company, setCompany] = useState(null)
  const [isLoadingCompany, setIsLoadingCompany] = useState(false)
  const [foundCompany, setFoundCompany] = useState(false)

  const handleCheckCompany = async () => {
    await form.validateFields(['ruc'])
    try {
      setIsLoadingCompany(true)
      const companyFound = await API.get(
        `/companies/ruc/${form.getFieldValue('ruc')}`
      )
      console.log('company found', companyFound.data)
      setCompany(companyFound.data)
      form.setFieldsValue(companyFound.data)
      setFoundCompany(true)
    } catch (e) {
      console.log('e', e)
      setCompany({})
      form.resetFields([
        'name',
        'type',
        'address',
        'phone',
        'mobile',
        'email',
        'city',
      ])
      setFoundCompany(false)
    }
    setIsLoadingCompany(false)
  }

  const handleResetCompany = () => {
    setCompany(null)
    form.resetFields([
      'name',
      'type',
      'address',
      'phone',
      'mobile',
      'email',
      'city',
    ])
    setFoundCompany(false)
  }

  return (
    <>
      <Form {...formItemLayout} name="company-step" form={form}>
        <Form.Item label="RUC" required>
          <Form.Item
            label="RUC"
            name="ruc"
            noStyle
            placeholder="Ingresa el RUC de la empresa donde realizarás tus prácticas"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa el ruc de la empresa.',
              },
            ]}
          >
            <Input disabled={foundCompany} style={{ width: 160 }} />
          </Form.Item>
          <Form.Item name="name" hidden rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          {!foundCompany ? (
            <Button onClick={handleCheckCompany} loading={isLoadingCompany}>
              Verificar
            </Button>
          ) : (
            <Button onClick={handleResetCompany}>Cambiar</Button>
          )}
        </Form.Item>
      </Form>

      {company && (
        <>
          {!foundCompany ? (
            <CompanyForm form={form} />
          ) : (
            <>
              <Row justify="center">
                <Col span={12}>
                  <Alert
                    message="Esta empresa ya está registrada en el sistema, puedes continuar al siguiente paso."
                    type="info"
                    showIcon
                  />
                </Col>
              </Row>

              <Form {...formItemLayout} name="company" form={form}>
                <Form.Item hidden name="id" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  hidden
                  name="representatives"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Nombre">{company.name}</Form.Item>
                <Form.Item label="Dirección">{company.address}</Form.Item>
                <Form.Item label="Ciudad">{company.city}</Form.Item>
                <Form.Item label="Correo">{company.email}</Form.Item>
                <Form.Item label="Teléfono 1">{company.phone}</Form.Item>
                <Form.Item label="Teléfono 2">{company.mobile}</Form.Item>
                <Form.Item label="Tipo">{company.type}</Form.Item>
              </Form>
            </>
          )}
        </>
      )}
    </>
  )
}

export default CompanyStep
