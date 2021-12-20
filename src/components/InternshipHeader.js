/**
 * Created by chalosalvador on 9/9/20
 */
import React, { useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  message,
  Modal,
  PageHeader,
  Row,
  Space,
  Typography,
} from 'antd'
import moment from 'moment'
import { useAuth } from '../providers/Auth'
import API from '../data'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import { useInternship } from '../data/useInternship'
import ShowError from './ShowError'
import AssignTeacherForm from './AssignTeacherForm'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal
const { Title } = Typography

const InternshipHeader = (props) => {
  const { internship, isLoading, isError, mutate } = useInternship(
    props.internship.id
  )
  const { currentUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAssignTeacherModal, setShowAssignTeacherModal] = useState(false)
  const [assignTeacherForm] = Form.useForm()

  const handleAssignTeacher = async ({ teacher_id }) => {
    confirm({
      title: '¿Confirmas que deseas enviar el formulario?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        try {
          setIsSubmitting(true)
          await API.put(`/internships/${internship.id}/teacher`, { teacher_id })
          await mutate()
          message.success('La práctica se ha autorizado correctamente.')
          assignTeacherForm.resetFields()
          setShowAssignTeacherModal(false)
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

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <ShowError error={isError} />
  }

  return (
    <>
      <PageHeader title={<Title>Detalles de la práctica</Title>} />

      <Descriptions
        title={
          <Divider orientation="center">
            <strong>DATOS DE PRACTICANTE</strong>
          </Divider>
        }
        bordered
        column={2}
      >
        <Descriptions.Item label="Nombre">
          {internship.student.name} {internship.student.lastname}
        </Descriptions.Item>
        <Descriptions.Item label="Carrera">
          {internship.student.career}
        </Descriptions.Item>
        <Descriptions.Item label="Créditos aprobados">{0}</Descriptions.Item>
        <Descriptions.Item label="Correo">
          {internship.student.email}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono">
          {internship.student.phone}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        bordered
        column={2}
        title={
          <Divider orientation="center">
            <strong>DATOS DE LA PRÁCTICA</strong>
          </Divider>
        }
      >
        <Descriptions.Item label="Fecha de creación">
          {moment(internship.created_at).format('DD/MM/YYYY HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="Estado">
          {internship.status}
        </Descriptions.Item>

        <Descriptions.Item label="Fecha de inicio">
          {moment(internship.start_date).format('DD/MM/YYYY')}
        </Descriptions.Item>
        <Descriptions.Item label="Fecha de fin">
          {internship.finish_date &&
            moment(internship.finish_date).format('DD/MM/YYYY')}
        </Descriptions.Item>

        <Descriptions.Item label="Tipo">{internship.type}</Descriptions.Item>

        <Descriptions.Item label="Convenio">
          {internship.institutional_agreement_code ? (
            <>
              <p>Código: {internship.institutional_agreement_code}</p>
              <p>Nombre: {internship.institutional_agreement_name}</p>
            </>
          ) : (
            'No'
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Proyecto de investigación">
          {internship.research_project_code ? (
            <>
              <p>Código: {internship.research_project_code}</p>
              <p>Nombre: {internship.research_project_name}</p>
            </>
          ) : (
            'No'
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Proyecto de vinculación">
          {internship.social_project_code ? (
            <>
              <p>Código: {internship.social_project_code}</p>
              <p>Nombre: {internship.social_project_name}</p>
            </>
          ) : (
            'No'
          )}
        </Descriptions.Item>

        <Descriptions.Item label="Área">{internship.area}</Descriptions.Item>

        <Descriptions.Item label="Actividades a desarrollar">
          {internship.student_activities}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={
          <Divider orientation="center">
            <strong>DATOS DE LA INSTITUCIÓN RECEPTORA</strong>
          </Divider>
        }
        bordered
        column={2}
      >
        <Descriptions.Item label="RUC">
          {internship.company.ruc}
        </Descriptions.Item>
        <Descriptions.Item label="Razón social">
          {internship.company.name}
        </Descriptions.Item>
        <Descriptions.Item label="Dirección">
          {internship.company.address}
        </Descriptions.Item>
        <Descriptions.Item label="Ciudad">
          {internship.company.city}
        </Descriptions.Item>
        <Descriptions.Item label="Correo">
          {internship.company.email}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono 1">
          {internship.company.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono 2">
          {internship.company.mobile}
        </Descriptions.Item>
        <Descriptions.Item label="Tipo">
          {internship.company.type}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        title={
          <Divider orientation="center">
            <strong>DATOS DEL RESPONSABLE DE LA INSTITUCIÓN RECEPTORA</strong>
          </Divider>
        }
        bordered
        column={2}
      >
        <Descriptions.Item label="Nombre">
          {internship.representative.name} {internship.representative.lastname}
        </Descriptions.Item>
        <Descriptions.Item label="Cargo">
          {internship.representative.job_title}
        </Descriptions.Item>
        <Descriptions.Item label="Correo">
          {internship.representative.email}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono 1">
          {internship.representative.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Teléfono 2">
          {internship.representative.mobile}
        </Descriptions.Item>
      </Descriptions>

      {internship.teacher ? (
        <Descriptions
          title={
            <Divider orientation="center">
              <strong>DATOS DE TUTOR(A)</strong>
            </Divider>
          }
          bordered
          column={2}
          extra={
            currentUser.role === 'ROLE_ADMINISTRATIVE' &&
            internship.status !== 'approved' &&
            internship.status !== 'rejected' &&
            internship.status !== 'registered' && (
              <Button
                type="primary"
                onClick={() => setShowAssignTeacherModal(true)}
              >
                Editar
              </Button>
            )
          }
        >
          <Descriptions.Item label="Nombre">
            {internship.teacher.name} {internship.teacher.lastname}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {internship.teacher.email}
          </Descriptions.Item>
          <Descriptions.Item label="Carrera">
            {internship.teacher.career}
          </Descriptions.Item>
          <Descriptions.Item label="Título">
            {internship.teacher.degree}
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <>
          <Row justify="center">
            <Col span={24} align="center">
              <Divider orientation="center">
                <strong>DATOS DE TUTOR(A)</strong>
              </Divider>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={12} align="center">
              <Space direction="vertical">
                <Alert
                  message="Aún no se ha asignado un tutor para estas prácticas."
                  description={
                    currentUser.role === 'ROLE_ADMINISTRATIVE' && (
                      <Button
                        type="primary"
                        onClick={() => setShowAssignTeacherModal(true)}
                      >
                        Asignar tutor
                      </Button>
                    )
                  }
                  type="warning"
                  showIcon
                />
              </Space>
            </Col>
          </Row>
        </>
      )}

      <Modal
        title="Asignar tutor de prácticas"
        visible={showAssignTeacherModal}
        closable={false}
        maskClosable={false}
        confirmLoading={isSubmitting}
        // okText='Enviar solicitud'
        // cancelText={ 'Cancelar' }
        onCancel={() => setShowAssignTeacherModal(false)}
        onOk={() => assignTeacherForm.submit()}
        // footer={ null }
        // width={ 800 }
        destroyOnClose={true}
      >
        <AssignTeacherForm
          form={assignTeacherForm}
          onSubmit={handleAssignTeacher}
        />
      </Modal>
    </>
  )
}

export default InternshipHeader
