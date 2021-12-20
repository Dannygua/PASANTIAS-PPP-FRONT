/**
 * Created by chalosalvador on 9/12/20
 */
import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'
import {
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import InternshipFormSteps from './InternshipFormSteps'

const { confirm } = Modal

const InternshipFormModal = ({ internship, edit }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCancel = () => {
    confirm({
      title: '¿Confirmas que deseas cerrar el formulario?',
      icon: <ExclamationCircleOutlined />,
      content: 'Se perderá toda la información ingresada.',
      okText: 'Sí',
      cancelText: 'No',
      onOk() {
        // form.resetFields();
        setShowModal(false)
      },
      onCancel() {},
    })
  }

  return (
    <>
      {
        <Row>
          <Col align="right">
            {!edit ? (
              <Button
                type="primary"
                style={{ marginBottom: 20 }}
                onClick={() => setShowModal(true)}
                icon={<PlusOutlined />}
              >
                Nueva solicitud de práctica
              </Button>
            ) : (
              <Button
                onClick={() => setShowModal(true)}
                icon={<EditOutlined />}
              >
                Editar
              </Button>
            )}
          </Col>
        </Row>
      }

      <Modal
        title={`${!edit ? 'Nueva' : 'Editar'} solicitud de prácticas`}
        visible={showModal}
        // closable={ false }
        maskClosable={false}
        // confirmLoading={ isSubmitting }
        // okText='Enviar solicitud'
        // cancelText={ 'Cancelar' }
        onCancel={handleCancel}
        // onOk={ () => form.submit() }
        footer={null}
        width={800}
        destroyOnClose={true}
      >
        {!edit ? (
          <InternshipFormSteps onFinish={() => setShowModal(false)} />
        ) : (
          <InternshipFormSteps
            onFinish={() => setShowModal(false)}
            internship={internship}
          />
        )}
      </Modal>
    </>
  )
}

export default InternshipFormModal
