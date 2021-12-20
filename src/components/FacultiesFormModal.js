import React, { useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'
import {
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import FacultiesForm from './FacultiesForm'

const { confirm } = Modal

const FacultiesFormModal = ({ faculty, edit }) => {
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
            <Button
              type="primary"
              style={{ marginBottom: 20 }}
              onClick={() => setShowModal(true)}
              icon={<PlusOutlined />}
            >
              Nueva Facultad
            </Button>
          </Col>
        </Row>
      }

      <Modal
        title={`${!edit ? 'Nueva' : 'Editar'} facultad`}
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
          <FacultiesForm onFinish={() => setShowModal(false)} />
        ) : (
          <FacultiesForm
            onFinish={() => setShowModal(false)}
            faculty={faculty}
          />
        )}
      </Modal>
    </>
  )
}

export default FacultiesFormModal
