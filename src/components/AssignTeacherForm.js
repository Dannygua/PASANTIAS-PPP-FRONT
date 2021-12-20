/**
 * Created by chalosalvador on 9/16/20
 */
import React, { useState } from 'react'
import { Form, Select } from 'antd'
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

const AssignTeacherForm = ({ onSubmit, form }) => {
  const { careers, isLoading } = useCareersList()
  const [currentTeachers, setCurrentTeachers] = useState([])

  const handleChangeCareer = (value) => {
    form.setFieldsValue({ teacherId: null })
    setCurrentTeachers(careers[value].teachers)
  }

  return (
    <Form
      form={form}
      {...formItemLayout}
      name="assign-teacher"
      onFinish={onSubmit}
    >
      <Form.Item
        name="career_id"
        label="Carrera"
        rules={[
          {
            required: true,
            message: 'Selecciona una carrera...',
          },
        ]}
      >
        <Select
          placeholder="Selecciona..."
          onChange={handleChangeCareer}
          loading={isLoading}
        >
          {careers.map((career, i) => (
            <Option key={career.id} value={i}>
              {career.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="teacher_id"
        label="Profesor"
        rules={[
          {
            required: true,
            message: 'Selecciona un profesor...',
          },
        ]}
      >
        <Select placeholder="Selecciona..." loading={isLoading}>
          {currentTeachers.map((teacher) => (
            <Option key={teacher.id} value={teacher.id}>
              {teacher.name} {teacher.lastname}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}

export default AssignTeacherForm
