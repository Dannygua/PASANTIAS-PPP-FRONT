/**
 * Created by chalosalvador on 9/14/20
 */
import React, { useState } from 'react'
import { DatePicker, Form, Input, Select, Switch } from 'antd'
import moment from 'moment'

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

const wideFields = [
  'Educación',
  'Artes y humanidades',
  'Ciencias sociales, periodismo, información y derecho',
  'Administración',
  'Ciencias naturales, matemáticas, y estadística',
  'Tecnologías de la información y la comunicación (TIC)',
  'Ingeniería, industría y construcción',
  'Agricultura, solvicultura, pesca y veterinaria',
  'Salud y bienestar',
  'Servicios',
]

const specificFields = [
  ['Educación'],
  ['Artes', 'Humanidades', 'Idiomas'],
  [
    'Ciencias sociales y del comportamiento',
    'Periodismo e información',
    'Derecho',
  ],
  ['Educación comercial y administración'],
  [
    'Ciencias biológicas y afines',
    'Medio ambiente',
    'Ciencias físicas',
    'Matemáticas y estadística',
  ],
  ['Tecnologías de la información y la comunicación (TIC)'],
  [
    'Ingeniería y profesiones afines',
    'Industria y producción',
    'Arquitectura y construcción',
  ],
  ['Agricultura', 'Silvicultura', 'Pesca', 'Veterinaria'],
  ['Salud', 'Bienestar'],
  [
    'Servicios personales',
    'Servicios de protección',
    'Servicios de seguridad',
    'Servicio de transporte',
  ],
]

const InternshipForm = ({ form }) => {
  const [currentSpecifics, setCurrentSpecifics] = useState([])
  const [
    showInstitutionalAgreementFields,
    setShowInstitutionalAgreementFields,
  ] = useState(false)
  const [showResearchProjectFields, setShowResearchProjectFields] =
    useState(false)
  const [showSocialProjectFields, setShowSocialProjectFields] = useState(false)

  const disabledDate = (current) => current && current > moment().endOf('day')
  const handleChangeWideField = (value) => {
    form.setFieldsValue({ specific_field: null })
    setCurrentSpecifics(specificFields[wideFields.indexOf(value)])
  }

  return (
    <Form
      {...formItemLayout}
      name="internship"
      // onFinish={ onSubmit }
      form={form}
      // initialValues={ props.internship }
    >
      <Form.Item
        name="type"
        label="Tipo"
        rules={[
          {
            required: true,
            message: 'Selecciona el tipo de prácticas.',
          },
        ]}
      >
        <Select placeholder="Selecciona...">
          <Option value="laboral">Laboral</Option>
          <Option value="servicio a la comunidad">
            Servicio a la comunidad
          </Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="wide_field"
        label="Campo amplio"
        rules={[
          {
            required: true,
            message: 'Selecciona el campo amplio.',
          },
        ]}
      >
        <Select placeholder="Selecciona..." onChange={handleChangeWideField}>
          {wideFields.map((wide) => (
            <Option key={wide} value={wide}>
              {wide}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="specific_field"
        label="Campo específico"
        rules={[
          {
            required: true,
            message: 'Selecciona el campo amplio.',
          },
        ]}
      >
        <Select placeholder="Selecciona...">
          {currentSpecifics.map((specific) => (
            <Option key={specific} value={specific}>
              {specific}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="start_date"
        label="Fecha de inicio"
        rules={[
          {
            required: true,
            message: 'Ingresa la fecha de inicio.',
          },
        ]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          inputReadOnly
          disabledDate={disabledDate}
        />
      </Form.Item>

      <Form.Item
        label="Área"
        name="area"
        rules={[
          {
            required: true,
            whitespace: true,
            message:
              'Indica el área de la empresa donde desarrollarás tus actividades.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="student_activities"
        label="Actividades:"
        rules={[
          {
            required: true,
            whitespace: true,
            message:
              'Detalla las actividades que desarrollarás durante las prácticas.',
          },
          {
            min: 40,
            message: 'Debes ingresar al menos 40 caracteres.',
          },
        ]}
      >
        <Input.TextArea
          placeholder="Detalla las actividades que desarrollarás durante las prácticas."
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>

      <Form.Item label="Convenio institucional">
        <Switch
          onChange={(checked) => setShowInstitutionalAgreementFields(checked)}
        />
      </Form.Item>
      {showInstitutionalAgreementFields && (
        <>
          <Form.Item
            name="institutional_agreement_code"
            label="Código"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa código del convenio institucional.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="institutional_agreement_name"
            label="Nombre"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa nombre del convenio institucional.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item label="Proyecto de investigación">
        <Switch onChange={(checked) => setShowResearchProjectFields(checked)} />
      </Form.Item>
      {showResearchProjectFields && (
        <>
          <Form.Item
            name="research_project_code"
            label="Código"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa código del proyecto de investigación.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="research_project_name"
            label="Nombre"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa nombre del proyecto de investigación.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}

      <Form.Item label="Proyecto de vinculación">
        <Switch onChange={(checked) => setShowSocialProjectFields(checked)} />
      </Form.Item>
      {showSocialProjectFields && (
        <>
          <Form.Item
            name="social_project_code"
            label="Código"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa código del proyecto de vinculación.',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="social_project_name"
            label="Nombre"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Ingresa nombre del proyecto de vinculación.',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </>
      )}
    </Form>
  )
}

export default InternshipForm
