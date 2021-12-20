import { Form, Button, Input, Select } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'
import { useCareersList } from '../data/useCareersList'
import { useDataList } from '../data/useDataList'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

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

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 18,
      offset: 6,
    },
  },
}

const SubjectForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataSearch, isLoading, isError } = useDataList('faculties')
  const [currentCareers, setCurrentCareers] = useState([])
  const { careers } = useCareersList()

  const addSubject = async (values) => {
    setIsSubmitting(true)
    await addObject('subjects', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editSubject = async (values) => {
    setIsSubmitting(true)
    await editObject('subjects', values, props.register.id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeFaculty = (value) => {
    dataSearch.map((faculty) =>
      faculty.id === value ? setCurrentCareers(faculty.careers) : []
    )
  }

  return !props.edit ? (
    <Form {...formItemLayout} onFinish={addSubject}>
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
          placeholder="Selecciona una facultad"
          onChange={handleChangeFaculty}
          loading={isLoading}
        >
          {dataSearch.map((faculty) => (
            <Option key={faculty.id} value={faculty.id}>
              {faculty.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="career_id"
        label="Carrera"
        rules={[
          {
            required: true,
            message: 'Selecciona un carrera...',
          },
        ]}
      >
        <Select placeholder="Selecciona una carrera" loading={isLoading}>
          {currentCareers.map((career) => (
            <Option key={career.id} value={career.id}>
              {career.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'Ingresa el nombre de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="Codigo"
        rules={[
          { required: true, message: 'Ingresa el codigo de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="level"
        label="Nivel"
        rules={[
          {
            required: true,
            message: 'Ingresa nivel de la materia.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="unit"
        label="Unidad"
        rules={[
          { required: true, message: 'Ingresa la unidad de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="field"
        label="Descripcion"
        rules={[
          { required: true, message: 'Ingresa la descripcion de la meteria.' },
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
    <Form
      {...formItemLayout}
      onFinish={editSubject}
      initialValues={{
        career_id: props.register.career_id,
        name: props.register.name,
        code: props.register.code,
        level: props.register.level,
        unit: props.register.unit,
        field: props.register.field,
        topics:
          props.register.topics.length > 0
            ? props.register.topics.map((activity) => activity.name)
            : [''],
      }}
    >
      <Form.Item
        name="career_id"
        label="Carrera"
        rules={[
          {
            required: true,
            message: 'Selecciona un carrera...',
          },
        ]}
      >
        <Select placeholder="Selecciona una carrera" loading={isLoading}>
          {careers.map((career) => (
            <Option key={career.id} value={career.id}>
              {career.name} {career.pensum}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        label="Nombre"
        rules={[
          { required: true, message: 'Ingresa el nombre de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="code"
        label="Codigo"
        rules={[
          { required: true, message: 'Ingresa el codigo de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="level"
        label="Nivel"
        rules={[
          {
            required: true,
            message: 'Ingresa el nivel de la materia.',
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="unit"
        label="Unidad"
        rules={[
          { required: true, message: 'Ingresa la unidad de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="field"
        label="Descripcion"
        rules={[
          { required: true, message: 'Ingresa la descripcion de la materia.' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.List name="topics">
        {(fields, { add, remove }) => {
          console.log('fileds info:', fields)
          return (
            <div>
              {fields.map((field, index) => (
                //console.log('recorro fields: ', field);
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Temas:' : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          'Agregue los temas que corresponden a la matería.',
                      },
                      {
                        min: 40,
                        message: 'Debes ingresar al menos 40 caracteres.',
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea
                      placeholder="Nombre del tema"
                      autoSize={{ maxRows: 4 }}
                      style={{ width: '90%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      style={{ margin: '0 8px' }}
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item {...formItemLayoutWithOutLabel}>
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                  style={{ width: '90%' }}
                >
                  <PlusOutlined /> Añadir un tema
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SubjectForm
