/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react'
import { Button, Descriptions, Divider, Form, message, Modal, Rate } from 'antd'
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import API from '../data'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import { mutate } from 'swr'
import { useAuth } from '../providers/Auth'
import { customRateIcons } from '../utils/form'
import ReportTutorSectionForm from './ReportTutorSectionForm'

const { confirm } = Modal

const ReportTutorSection = ({ internship }) => {
  const [form] = Form.useForm()
  const { currentUser } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSendReport = async (values) => {
    confirm({
      title: '¿Confirmas que deseas enviar el formulario?',
      icon: <ExclamationCircleOutlined />,
      content: 'No podrás editar esta información una vez que la envíes.',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        console.log('values', values)
        try {
          setIsSubmitting(true)
          await API.put(`/internships/${internship.id}/tutor`, values)

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

  return (
    <>
      <Descriptions
        title={
          <Divider orientation="center">
            <strong>REPORTE DEL TUTOR ACADÉMICO</strong>
          </Divider>
        }
        bordered
        column={2}
        extra={
          currentUser.role === 'ROLE_TEACHER' &&
          currentUser.teacher_id === internship.teacher_id &&
          internship.status === 'tutor_pending' && (
            <Button type="primary" onClick={() => setShowModal(true)}>
              Completar reporte
            </Button>
          )
        }
      >
        <Descriptions.Item
          label="Novedades reportadas por el estudiante/empresa"
          span={2}
        >
          {internship.tutor_observations}
        </Descriptions.Item>

        <Descriptions.Item label="¿Recomiendas que otros estudiantes realicen sus ppp en esta Institución o Empresa?">
          {internship.tutor_recommends !== null ? (
            internship.tutor_recommends ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            )
          ) : null}
        </Descriptions.Item>

        <Descriptions.Item label="Observaciones">
          {internship.tutor_recommends_observations}
        </Descriptions.Item>

        <Descriptions.Item label="En general, ¿las ppp realizadas por el estudiante aportaron a su formación profesional, es decir aportaron a cumplir con su perfil de egreso?">
          {internship.tutor_knowledge_contribution !== null ? (
            internship.tutor_knowledge_contribution ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            )
          ) : null}
        </Descriptions.Item>

        <Descriptions.Item label="Observaciones">
          {internship.tutor_knowledge_contribution_observations}
        </Descriptions.Item>

        <Descriptions.Item label="¿Recomienda la aprobación de las prácticas preprofesionales del estudiante?">
          {internship.tutor_recommends_approval !== null ? (
            internship.tutor_recommends_approval ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#eb2f96" />
            )
          ) : null}
        </Descriptions.Item>

        <Descriptions.Item label="Observaciones">
          {internship.tutor_recommends_approval_observations}
        </Descriptions.Item>
      </Descriptions>

      <Modal
        title={'Completar reporte de prácticas'}
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
        <ReportTutorSectionForm
          form={form}
          onSubmit={handleSendReport}
          internship={internship}
        />
      </Modal>
    </>
  )
}

export default ReportTutorSection
