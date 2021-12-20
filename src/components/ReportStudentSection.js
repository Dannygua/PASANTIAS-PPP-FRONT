/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react'
import { Button, Descriptions, Divider, Form, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ReportStudentSectionForm from './ReportStudentSectionForm'
import API from '../data'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import { mutate } from 'swr'
import moment from 'moment'
import { useAuth } from '../providers/Auth'

const { confirm } = Modal

const ReportStudentSection = ({ internship }) => {
  const [form] = Form.useForm()
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendReport = async (values) => {
    confirm({
      title: '¿Confirmas que deseas enviar el formulario?',
      icon: <ExclamationCircleOutlined />,
      content:
        'Podrás editar la información enviada solo antes de que el representante de la empresa llene su informe.',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        console.log('values', values)
        try {
          setIsSubmitting(true)
          await API.put(`/internships/${internship.id}/student`, {
            ...values,
            finish_date: moment(values.finish_date).format('YYYY-MM-DD'),
            recommended_topics:
              values.recommended_topics && values.recommended_topics[0] !== ''
                ? values.recommended_topics
                : null,
          })

          await mutate(`/internships/${internship.id}`)
          form.resetFields()
          message.success('El reporte se ha guardado correctamente.')
          setShowModal(false)
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />
          message.error(
            <>
              {translateMessage(e.message)}
              {errorList}
            </>
          )
        }
        setIsSubmitting(false)
      },
      onCancel() {},
    })
  }

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      confirm({
        title: '¿Confirmas que deseas cerrar el formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'Se perderá toda la información ingresada.',
        okText: 'Sí',
        cancelText: 'No',
        onOk() {
          form.resetFields()
          setShowModal(false)
        },
        onCancel() {},
      })
    } else {
      setShowModal(false)
    }
  }

  const renderUsefulTopics = (topicsBySubject) => {
    let items = []
    for (const subject_id in topicsBySubject) {
      items.push(
        <div key={subject_id}>
          <div>
            <strong>
              {topicsBySubject[subject_id][0].subject_name.toUpperCase()}
            </strong>
          </div>
          <ul>
            {topicsBySubject[subject_id].map((topic, i) => (
              <li key={i}>{topic.name}</li>
            ))}
          </ul>
        </div>
      )
    }

    return items
  }

  return (
    <>
      <Descriptions
        title={
          <Divider orientation="center">
            <strong>REPORTE DEL ESTUDIANTE</strong>
          </Divider>
        }
        bordered
        column={1}
        extra={
          currentUser.role === 'ROLE_STUDENT' &&
          currentUser.student_id === internship.student_id &&
          (internship.status === 'in_progress' ||
            internship.status === 'representative_pending') && (
            <Button type="primary" onClick={() => setShowModal(true)}>
              Completar reporte
            </Button>
          )
        }
      >
        <Descriptions.Item label="Horas ejecutadas">
          {internship.hours_worked}
        </Descriptions.Item>
        <Descriptions.Item label="Actividades principales desarrolladas">
          <ol>
            {internship.activities.map((activity, i) => (
              <li key={i}>{activity.description}</li>
            ))}
          </ol>
        </Descriptions.Item>
        <Descriptions.Item label="Observaciones del estudiante">
          {internship.student_observations}
        </Descriptions.Item>

        <Descriptions.Item label="Asignaturas de la malla curricular y temáticas de mayor utilidad para el desarrollo de la práctica:">
          {renderUsefulTopics(internship.useful_topics)}
        </Descriptions.Item>

        <Descriptions.Item label="Temáticas que hicieron falta y que no constan en la malla curricular">
          <ul>
            {internship.recommended_topics.map((topic, i) => (
              <li key={i}>{topic.name}</li>
            ))}
          </ul>
        </Descriptions.Item>
      </Descriptions>

      <Modal
        title={`${
          internship.status === 'in_progress' ? 'Completar' : 'Editar'
        } reporte`}
        visible={showModal}
        width={800}
        closable={false}
        maskClosable={false}
        okText="Enviar reporte"
        confirmLoading={isSubmitting}
        cancelText={'Cancelar'}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <ReportStudentSectionForm
          form={form}
          onSubmit={handleSendReport}
          internship={internship}
        />
      </Modal>
    </>
  )
}

export default ReportStudentSection
