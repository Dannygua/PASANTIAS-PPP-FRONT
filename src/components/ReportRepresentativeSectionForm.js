/**
 * Created by chalosalvador on 9/21/20
 */
import React from 'react'
import { Alert, Form, Input, Rate, Typography } from 'antd'
import { customRateIcons, formItemLayout } from '../utils/form'

const { Title } = Typography

const ReportRepresentativeSectionForm = ({ form, onSubmit, internship }) => {
  return (
    <Form
      {...formItemLayout}
      onFinish={onSubmit}
      form={form}
      name="report-representative"
      initialValues={internship}
    >
      <Title level={5}>¿Cuántos buhos le otorgas a este estudiante?</Title>

      <Alert
        message="¿Por qué los buhos?"
        description="El buho ha identificado a la EPN durante todos sus años de existencia"
        showIcon
      />

      <Form.Item
        name="evaluation_performance"
        label="Desempeño"
        style={{ alignItems: 'center' }}
        rules={[
          {
            required: true,
            message: '¿Cuántos búhos le otorgas por su desempeño?',
          },
        ]}
      >
        <Rate
          style={{
            fontSize: 40,
            color: '#096dd9',
          }}
          allowClear={false}
          character={({ index }) => {
            return customRateIcons[index + 1].icon
          }}
        />
      </Form.Item>

      <Form.Item
        name="evaluation_motivation"
        label="Motivación"
        style={{ alignItems: 'center' }}
        rules={[
          {
            required: true,
            message: '¿Cuántos búhos le otorgas por su motivación?',
          },
        ]}
      >
        <Rate
          style={{
            fontSize: 40,
            color: '#096dd9',
          }}
          allowClear={false}
          character={({ index }) => {
            return customRateIcons[index + 1].icon
          }}
        />
      </Form.Item>

      <Form.Item
        name="evaluation_knowledge"
        label="Conocimientos"
        style={{ alignItems: 'center' }}
        rules={[
          {
            required: true,
            message: '¿Cuántos búhos le otorgas por sus conocimientos?',
          },
        ]}
      >
        <Rate
          style={{
            fontSize: 40,
            color: '#096dd9',
          }}
          allowClear={false}
          character={({ index }) => {
            return customRateIcons[index + 1].icon
          }}
        />
      </Form.Item>

      <Form.Item
        name="evaluation_punctuality"
        label="Puntualidad y responsabilidad"
        style={{ alignItems: 'center' }}
        rules={[
          {
            required: true,
            message:
              '¿Cuántos búhos le otorgas por sus puntualidad y responsabilidad?',
          },
        ]}
      >
        <Rate
          style={{
            fontSize: 40,
            color: '#096dd9',
          }}
          allowClear={false}
          character={({ index }) => {
            return customRateIcons[index + 1].icon
          }}
        />
      </Form.Item>

      <Form.Item
        name="evaluation_observations"
        label="Observaciones y comentarios:"
        rules={[
          {
            required: true,
            whitespace: true,
            message:
              'Ingresa observaciones o comentarios generales sobre tu experiencia al recibir a este practicante.',
          },
          {
            min: 40,
            message: 'Debes ingresar al menos 40 caracteres.',
          },
        ]}
      >
        <Input.TextArea
          placeholder="Nos interesa conocer tus observaciones o comentarios sobre nuestros estudiantes."
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>
    </Form>
  )
}

export default ReportRepresentativeSectionForm
