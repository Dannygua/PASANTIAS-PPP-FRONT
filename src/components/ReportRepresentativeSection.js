/**
 * Created by chalosalvador on 9/11/20
 */
import React, { useState } from 'react'
import { Button, Descriptions, Divider, Form, message, Modal, Rate } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import API from '../data'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import { mutate } from 'swr'
import { useAuth } from '../providers/Auth'
import { customRateIcons } from '../utils/form'
import ReportRepresentativeSectionForm from './ReportRepresentativeSectionForm'

const { confirm } = Modal

const ReportRepresentativeSection = ({ internship }) => {
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
          await API.put(`/internships/${internship.id}/representative`, values)

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

  const renderRate = (value) => (
    <>
      <Rate
        disabled
        value={value}
        style={{
          color: '#096dd9',
          fontSize: 25,
        }}
        character={({ index }) => customRateIcons[index + 1].icon}
      />
      {value ? (
        <span className="ant-rate-text">{customRateIcons[value].text}</span>
      ) : (
        ''
      )}
    </>
  )

  return (
    <>
      <Descriptions
        title={
          <Divider orientation="center">
            <strong>REPORTE DE LA EMPRESA</strong>
          </Divider>
        }
        bordered
        column={2}
        extra={
          currentUser.role === 'ROLE_REPRESENTATIVE' &&
          currentUser.representative_id === internship.representative_id &&
          internship.status === 'representative_pending' && (
            <Button type="primary" onClick={() => setShowModal(true)}>
              Completar reporte
            </Button>
          )
        }
      >
        <Descriptions.Item label="Desempeño" span={2}>
          {renderRate(internship.evaluation_performance)}
        </Descriptions.Item>
        <Descriptions.Item label="Motivación" span={2}>
          {renderRate(internship.evaluation_motivation)}
        </Descriptions.Item>
        <Descriptions.Item label="Habilidades y destrezas" span={2}>
          {renderRate(internship.evaluation_knowledge)}
        </Descriptions.Item>
        <Descriptions.Item label="Puntualidad y responsabilidad" span={2}>
          {renderRate(internship.evaluation_punctuality)}
        </Descriptions.Item>
        <Descriptions.Item label="Observaciones" span={2}>
          {internship.evaluation_observations}
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
        <ReportRepresentativeSectionForm
          form={form}
          onSubmit={handleSendReport}
          internship={internship}
        />
      </Modal>
    </>
  )
}

export default ReportRepresentativeSection
