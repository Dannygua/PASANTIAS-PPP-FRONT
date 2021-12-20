/**
 * Created by chalosalvador on 10/14/20
 */

import React, { useState } from 'react'
import {
  Divider,
  Comment,
  List,
  Tooltip,
  Badge,
  Form,
  Input,
  Button,
  Typography,
  Radio,
  message,
  Modal,
} from 'antd'
import {
  ExclamationCircleOutlined,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import moment from 'moment'
import '../styles/internship-followups.css'
import API from '../data'
import { mutate } from 'swr'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import { useAuth } from '../providers/Auth'

const { TextArea } = Input
const { Title } = Typography
const { confirm } = Modal

const InternshipFollowups = ({ internship }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { currentUser } = useAuth()
  const [form] = Form.useForm()

  const getFollowupsData = () => {
    return internship.followups.map((followup) => {
      const badgeColor =
        followup.type === 'followup'
          ? 'blue'
          : followup.type === 'compliment'
          ? 'green'
          : 'red'

      const userType =
        followup.user_type === 'student'
          ? 'estudiante'
          : followup.user_type === 'teacher'
          ? 'tutor'
          : followup.user_type === 'representative'
          ? 'jefe'
          : 'comisión'
      return {
        // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: (
          <>
            <Badge color={badgeColor} />{' '}
            {`${followup.user.name} ${followup.user.lastname} (${userType})`}
          </>
        ),
        content: <p>{followup.text}</p>,
        datetime: (
          <Tooltip
            title={moment(followup.created_at).format('DD-MM-YYYY HH:mm:ss')}
          >
            <span>{moment(followup.created_at).fromNow()}</span>
          </Tooltip>
        ),
      }
    })
  }

  const handleSendReport = async (values) => {
    confirm({
      title: '¿Confirmas que deseas enviar el informe?',
      icon: <ExclamationCircleOutlined />,
      content: 'No podrás editar esta información una vez que la envíes.',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        console.log('values', values)
        try {
          setIsSubmitting(true)
          await API.post(`/internships/${internship.id}/followups`, values)

          await mutate(`/internships/${internship.id}`)
          form.resetFields()
          message.success('El informe se ha guardado correctamente.')
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

  return (
    <div
      style={{
        width: '90%',
        margin: '0 auto',
      }}
    >
      <List
        header={
          <Divider orientation="center">
            <strong>HISTORIAL DE SEGUIMIENTO DE LA PRÁCTICA</strong>
          </Divider>
        }
        itemLayout="horizontal"
        dataSource={getFollowupsData()}
        renderItem={(item) => (
          <List.Item>
            <Comment
              // actions={ item.actions }
              author={item.author}
              // avatar={ item.avatar }
              content={item.content}
              datetime={item.datetime}
            />
          </List.Item>
        )}
      />

      {internship.status === 'in_progress' &&
        (currentUser.role === 'ROLE_COMMISSION' ||
          (currentUser.role === 'ROLE_STUDENT' &&
            internship.student_id === currentUser.student_id) ||
          (currentUser.role === 'ROLE_TEACHER' &&
            internship.teacher_id === currentUser.teacher_id) ||
          (currentUser.role === 'ROLE_REPRESENTATIVE' &&
            internship.representative_id ===
              currentUser.representative_id)) && (
          <>
            <Title level={4}>Ingresa un nuevo informe de seguimiento</Title>
            <Form
              form={form}
              initialValues={{ type: 'followup' }}
              onFinish={handleSendReport}
            >
              <Form.Item
                name="type"
                label="Tipo de informe"
                rules={[
                  {
                    required: true,
                    message: 'Selecciona el tipo de informe',
                  },
                ]}
              >
                <Radio.Group buttonStyle="solid" size="large">
                  <Radio.Button className="compliment" value="compliment">
                    <SmileOutlined /> Felicitación
                  </Radio.Button>
                  <Radio.Button className="followup" ghost value="followup">
                    <MehOutlined /> Seguimiento
                  </Radio.Button>
                  <Radio.Button className="complaint" danger value="complaint">
                    <FrownOutlined /> Queja
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="text"
                label="Comentario"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Ingresa el texto de tu informe.',
                  },
                  // {
                  //   min: 40,
                  //   message: 'Ingresa al menos 40 caracteres.'
                  // }
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary" loading={isSubmitting}>
                  Agregar nuevo seguimiento
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
    </div>
  )
}

export default InternshipFollowups
