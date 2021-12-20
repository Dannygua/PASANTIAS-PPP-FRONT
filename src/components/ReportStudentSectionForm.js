/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react'
import { Button, DatePicker, Form, Input, InputNumber, TreeSelect } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import { useTopicsBySubject } from '../data/useTopicsBySubjectList'

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

const ReportStudentSectionForm = ({ form, onSubmit, internship }) => {
  // TODO careerId
  const { topicsBySubject, isLoading } = useTopicsBySubject(internship.student.career_id)

  const disabledDate = (current) => current && current > moment().endOf('day')

  const getTopicsTreeData = () => {
    return topicsBySubject.map((subject) => ({
      key: `subject-${subject.id}`,
      title: subject.name,
      value: `subject-${subject.id}`,
      children: subject.topics.map((topic) => ({
        key: topic.id,
        title: topic.name,
        value: topic.id,
      })),
    }))
  }

  const getDefaultUsefulTopics = () => {
    const useful_topics = []
    for (let subject_id in internship.useful_topics) {
      internship.useful_topics[subject_id].forEach((topic) =>
        useful_topics.push(topic.id)
      )
    }

    console.log('useful_topics', useful_topics)

    return useful_topics
  }

  return (
    <Form
      {...formItemLayout}
      onFinish={onSubmit}
      form={form}
      name="report-student"
      initialValues={{
        ...internship,
        finish_date: internship.finish_date
          ? moment(internship.finish_date)
          : null,
        activities:
          internship.activities.length > 0
            ? internship.activities.map((activity) => activity.description)
            : [''],
        useful_topics: getDefaultUsefulTopics(),
        recommended_topics:
          internship.recommended_topics.length > 0
            ? internship.recommended_topics.map((topic) => topic.name)
            : [''],
      }}
    >
      <Form.Item
        name="finish_date"
        label="Fecha de finalización"
        rules={[
          {
            required: true,
            message: 'Ingresa la fecha en que terminaste las prácticas',
          },
        ]}
      >
        <DatePicker
          inputReadOnly
          disabledDate={disabledDate}
          format="DD/MM/YYYY"
        />
      </Form.Item>

      <Form.Item
        label="Horas"
        name="hours_worked"
        rules={[
          {
            required: true,
            message: 'Ingresa la cantidad de horas que vas a reportar.',
          },
          {
            type: 'number',
            min: 1,
            message: 'Ingresa un valor numérico.',
          },
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.List name="activities">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Actividades:' : ''}
                  required={true}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    // validateTrigger={ [ 'onChange', 'onBlur' ] }
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          'Detalla las actividades desarrolladas durante las prácticas.',
                      },
                      {
                        min: 40,
                        message: 'Debes ingresar al menos 40 caracteres.',
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea
                      placeholder="Descripción de la actividad"
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
                  <PlusOutlined /> Añadir una actividad
                </Button>
              </Form.Item>
            </div>
          )
        }}
      </Form.List>

      <Form.Item
        name="student_observations"
        label="Observaciones:"
        rules={[
          {
            required: true,
            whitespace: true,
            message:
              'Detalla las actividades desarrolladas durante las prácticas.',
          },
          {
            min: 40,
            message: 'Debes ingresar al menos 40 caracteres.',
          },
        ]}
      >
        <Input.TextArea
          placeholder="Observaciones sobre las prácticas que has realizado en la empresa."
          autoSize={{ maxRows: 4 }}
        />
      </Form.Item>

      <Form.Item
        name="useful_topics"
        label="Temas útiles:"
        extra="Asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:"
        rules={[
          {
            required: true,
            message:
              'Selecciona los temas que fueron útiles durante tu práctica.',
          },
        ]}
      >
        <TreeSelect
          allowClear={true}
          dropdownStyle={{
            maxHeight: 400,
            overflow: 'auto',
          }}
          loading={isLoading}
          treeData={getTopicsTreeData()}
          placeholder="Puedes seleccionar varios temas..."
          // showCheckedStrategy={ TreeSelect.SHOW_CHILD }
          treeCheckable={true}
          maxTagCount={10}
          // onChange={(value)=> console.log( 'value', value )}
        />
      </Form.Item>

      <Form.List name="recommended_topics">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Temas recomendados:' : ''}
                  // required={ true }
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    // validateTrigger={ [ 'onChange', 'onBlur' ] }
                    rules={[
                      {
                        required: fields.length > 1,
                        whitespace: true,
                        message: 'Ingresa el tema.',
                      },
                    ]}
                    noStyle
                  >
                    <Input.TextArea
                      placeholder=""
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
              <Form.Item
                {...formItemLayoutWithOutLabel}
                extra="Temas que fueron necesario y que no constan en la malla curricular"
              >
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
    </Form>
  )
}

export default ReportStudentSectionForm
