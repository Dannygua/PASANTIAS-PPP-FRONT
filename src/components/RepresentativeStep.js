/**
 * Created by chalosalvador on 9/14/20
 */
import React, { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Form,
  Modal,
  Row,
  Select,
  Typography,
} from 'antd'
import RepresentativeForm from './RepresentativeForm'

const { confirm } = Modal
const { Title } = Typography
const { Option } = Select

const RepresentativeStep = ({ representatives, form }) => {
  const [viewNewForm, setViewNewForm] = useState(false)
  const toggleForm = () => {
    if (viewNewForm) {
      confirm({
        title: '¿Confirmas que deseas cancelar este formulario?',
        icon: <ExclamationCircleOutlined />,
        content: 'Se perderá toda la información ingresada.',
        okText: 'Sí',
        cancelText: 'No',
        onOk: async () => {
          form.resetFields()
          setViewNewForm((prevState) => !prevState)
        },
        onCancel() {},
      })
    } else {
      form.resetFields()
      setViewNewForm((prevState) => !prevState)
    }
  }

  return (
    <>
      {!viewNewForm ? (
        <>
          <Form form={form}>
            <Divider>
              <Title level={5}>
                Selecciona el representante de la empresa que te acompañará
                durante las prácticas
              </Title>
            </Divider>
            <Form.Item
              name="id"
              label="Representante"
              rules={[
                {
                  required: true,
                  message: 'Selecciona un representante',
                },
              ]}
            >
              <Select>
                {representatives &&
                  representatives.map((representative) => (
                    <Option key={representative.id} value={representative.id}>
                      {`${representative.name} ${representative.lastname}`}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Form>

          <Row justify="center">
            <Col>
              <Button type="primary" onClick={toggleForm}>
                Deseo agregar un representante
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row justify="center" style={{ marginBottom: 40 }}>
            <Col>
              <Button type="primary" onClick={toggleForm}>
                Deseo seleccionar un representante
              </Button>
            </Col>
          </Row>

          <Divider>
            <Title level={5}>Agregar un representante de la empresa</Title>
          </Divider>

          <RepresentativeForm form={form} />
        </>
      )}
    </>
  )
}

export default RepresentativeStep
