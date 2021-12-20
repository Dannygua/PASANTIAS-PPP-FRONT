import { Form, Button, Input, Select } from 'antd'
import React, { useContext, useState } from 'react'
import ModalContext from '../context/ModalContext'
import { addObject, editObject } from '../utils/formActions'
import { useDataList } from '../data/useDataList'
import { useCareersList } from '../data/useCareersList'

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

const StudentForm = (props) => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { dataSearch, isLoading, isError } = useDataList('faculties')
  const [currentCareers, setCurrentCareers] = useState([])
  const { careers } = useCareersList()

  const addStudent = async (values) => {
    setIsSubmitting(true)
    await addObject('students', values)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const editStudent = async (values) => {
    setIsSubmitting(true)
    await editObject('students', values, props.register.student_id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeFaculty = (value) => {
    dataSearch.map((faculty) =>
      faculty.id === value ? setCurrentCareers(faculty.careers) : []
    )
  }

  return !props.edit ? (
    <Form onFinish={addStudent} {...formItemLayout}>
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
          onClear={handleChangeFaculty}
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
              { required: true, message: 'Ingresa su nombre.' },
              { pattern: /^[a-zA-Z ]+/g, message: 'Ingrese solo letras.' }
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="lastname"
          label="Apellido"
          rules={[
              { required: true, message: 'Ingresa su apellido.' },
              { pattern: /^[a-zA-Z ]+/g, message: 'Ingrese solo letras.' }
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="email"
          label="Email"
          rules={[
              { required: true, message: 'Ingrese un email.' },
              { type: 'email', message: 'Ingrese un email valido.'}
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
              { required: true, message: 'Ingresa su numero de teléfono convencional.' },
              { pattern: /(^[0-9]{7})+/g, message: 'Ingrese un número, 7 digitos.' },
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="mobile"
          label="Celular"
          rules={[
              { required: true, message: 'Ingresa su número de teléfono celular.' },
              { pattern: /(^[0-9]{10})+/g, message: 'Ingrese un número, 10 digitos.'}
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sex"
        label="Sexo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor seleccione su sexo',
          },
        ]}
      >
        <Select placeholder="Seleccione su sexo">
          <Option value="female">Mujer</Option>
          <Option value="male">Hombre</Option>
        </Select>
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
      onFinish={editStudent}
      initialValues={{
        career_id: props.register.career_id,
        faculty_id: props.register.faculty_id,
        name: props.register.student_name,
        lastname: props.register.student_lastname,
        email: props.register.student_email,
        phone: props.register.student_phone,
        mobile: props.register.student_mobile,
        sex: props.register.student_sex,
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
              {career.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
          name="name"
          label="Nombre"
          rules={[
              { required: true, message: 'Ingresa su nombre.' },
              { pattern: /^[a-zA-Z ]+/g, message: 'Ingrese solo letras.' }
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="lastname"
          label="Apellido"
          rules={[
              { required: true, message: 'Ingresa su apellido.' },
              { pattern: /^[a-zA-Z ]+/g, message: 'Ingrese solo letras.' }
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="email"
          label="Email"
          rules={[
              { required: true, message: 'Ingrese un email.' },
              { type: 'email', message: 'Ingrese un email valido.'}
          ]}

      >
        <Input />
      </Form.Item>
      <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
              { required: true, message: 'Ingresa su numero de teléfono convencional.' },
              { pattern: /(^[0-9]{7})+/g, message: 'Ingrese un número, 7 digitos.' },
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
          name="mobile"
          label="Celular"
          rules={[
              { required: true, message: 'Ingresa su número de teléfono celular.' },
              { pattern: /(^[0-9]{10})+/g, message: 'Ingrese un número, 10 digitos.'}
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sex"
        label="Sexo"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Por favor seleccione su sexo',
          },
        ]}
      >
        <Select placeholder="Seleccione su sexo">
          <Option value="female">Mujer</Option>
          <Option value="male">Hombre</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Editar
        </Button>
      </Form.Item>
    </Form>
  )
}

export default StudentForm
