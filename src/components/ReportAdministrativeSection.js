/**
 * Created by chalosalvador on 9/29/20
 */
import React from 'react'
import { Button, Descriptions, Divider, Form, message, Modal } from 'antd'
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

const { confirm } = Modal

const ReportAdministrativeSection = ({ internship }) => {
  const { currentUser } = useAuth()

  const handleSendReport = async (values) => {
    confirm({
      title:
        '¿Confirmas que deseas marcar las horas de este informe como registradas en el SAEw?',
      icon: <ExclamationCircleOutlined />,
      content: 'No podrás editar esta información una vez que la envíes.',
      okText: 'Sí, ya he registrado estas horas en el SAEw',
      cancelText: 'No',
      onOk: async () => {
        try {
          await API.put(`/internships/${internship.id}/registration`)
          await mutate(`/internships/${internship.id}`)
          message.success('El reporte se ha guardado correctamente.')
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />
          message.error(
            <>
              {translateMessage(e.message)}
              {errorList}
            </>
          )
        }
      },
      onCancel() {},
    })
  }

  return (
    <>
      <Descriptions
        title={
          <Divider orientation="center">
            <strong>REPORTE DE LA MÁXIMA AUTORIDAD</strong>
          </Divider>
        }
        bordered
        column={2}
        extra={
          currentUser.role === 'ROLE_ADMINISTRATIVE' &&
          internship.status === 'approved' && (
            <Button type="primary" onClick={handleSendReport}>
              Marcar como horas registradas en el SAEw
            </Button>
          )
        }
      >
        <Descriptions.Item label="¿Horas registradas en el SAEw?" span={2}>
          {internship.status === 'registered' ? (
            <>
              <CheckCircleTwoTone twoToneColor="#52c41a" /> Si
            </>
          ) : (
            <>
              <CloseCircleTwoTone twoToneColor="#eb2f96" /> No
            </>
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}

export default ReportAdministrativeSection
