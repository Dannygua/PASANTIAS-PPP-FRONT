import React, { useState } from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import FacultiesForm from '../components/FacultiesForm'
import CareerForm from '../components/CareerForm'
import SubjectForm from '../components/SubjectForm'
import StudentForm from '../components/StudentForm'
import TeacherForm from '../components/TeacherForm'
import TopicForm from '../components/TopicForm'
import AdministrativeForm from '../components/AdministrativeForm'
import PropTypes from 'prop-types'
import Actions from '../components/Actions'
import TopicsPage from '../pages/TopicsPage'
import Topics from '../pages/TopicsPage'
import RecoverPasswordPage from '../pages/RecoverPasswordPage'

const ModalContext = React.createContext({})
const { confirm } = Modal
export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [register, setRegister] = useState([])
  const [form, setForm] = useState('')
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

  const ModalForm = (props) => {
    let contentForm
    switch (form) {
      case 'FacultiesForm':
        contentForm = <FacultiesForm edit={edit} register={register} />
        break
      case 'CareerForm':
        contentForm = <CareerForm edit={edit} register={register} />
        break
      case 'SubjectForm':
        contentForm = <SubjectForm edit={edit} register={register} />
        break
      case 'TopicForm':
        contentForm = <TopicForm edit={edit} register={register} />
        break
      case 'StudentForm':
        contentForm = <StudentForm edit={edit} register={register} />
        break
      case 'TeacherForm':
        contentForm = <TeacherForm edit={edit} register={register} />
        break
      case 'AdministrativeForm':
        contentForm = <AdministrativeForm edit={edit} register={register} />
        break
      case 'RecoverPasswordPage':
        contentForm = <RecoverPasswordPage edit={edit} register={register} />
        break
      default:
        console.log('No se ha enviado un formulario como paráemtro')
        break
    }
    return contentForm
  }
  return (
    <>
      <ModalContext.Provider
        data-test="Modal"
        value={{ setShowModal, setEdit, setRegister, setForm }}
      >
        {children}
        <Modal
          title={!edit ? <h3>Agregar</h3> : <h3>Edicion</h3>}
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
          <ModalForm />
        </Modal>
      </ModalContext.Provider>
    </>
  )
}

ModalContext.propTypes = {
  setShowModal: PropTypes.bool,
  setEdit: PropTypes.bool,
  setForm: PropTypes.string,
  dataSource: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
}

export default ModalContext
