import React, { useContext, useState } from 'react'
import {
  Button,
  Empty,
  Popconfirm,
  Table,
  message,
  Divider,
  Row,
  Col,
  Tag,
} from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import { deleteObject } from '../utils/formActions'
import ShowError from './ShowError'
import API from '../data'
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";

const StudentList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('students')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [fileData, setFileData] = useState('')
  const handleChange = (file) => {
    setFileData(file[0])
  }

  const submitData = async (e) => {
    e.preventDefault()
    const fData = new FormData()
    fData.append('file', fileData)
    await API.post('/students/uploadImportFile', fData)
    message.success('Los datos de los estudiante se han cargado con exito...')
  }

  const deleteStudent = async (record) => {
    setIsSubmitting(true)
    await deleteObject('students', record.student_id)
    setIsSubmitting(false)
    setShowModal(false)
  }

  const handleChangeStatus = (record) => {
    if (record == "active") {
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">Activo</Tag>
      )
    } else {
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">Desactivado</Tag>
      )
    }
  }

  const columns = [
    {
      id: 'Código',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: 'Nombre',
      dataIndex: 'student_name',
      key: 'student_name',
      ...GetColumnSearchProps('student_name',

      )
    },
    {
      title: 'Apellido',
      dataIndex: 'student_lastname',
      key: 'student_lastname',
      ...GetColumnSearchProps(
          'student_lastname'
      )
    },
    {
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
      ...GetColumnSearchProps(
          'career'
      )
    },
    {
      title: 'Facultad',
      dataIndex: 'faculty',
      key: 'faculty',
      ...GetColumnSearchProps(
          'faculty'
      )
    },
    {
      title: 'Estado',
      dataIndex: 'student_status',
      key: 'student_status',
      filters: [
        {
          text: 'Activos',
          value: 'active',
        },
        {
          text: 'Desactivados',
          value: 'disabled',
        },
      ],
      onFilter: (value, record) => record.student_status.indexOf(value) === 0,
      render: (record) => (
        <>
          {handleChangeStatus(record)}
        </>
      )
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              DataSet(record, props.form)
            }}
            size="middle"
          >
            Editar
          </Button>
          <Popconfirm
            title="Desea eliminar el dato?"
            onConfirm={() => deleteStudent(record)}
          >
            <Button size="middle">Eliminar</Button>
          </Popconfirm>
        </>
      ),
    },
  ]

  if (isError) {
    return <ShowError error={isError} />
  }

  return (
    <>
      <Row justify="end">
        <Col>
          <form onSubmit={submitData}>
            <label>Seleccionar un archivo</label>
            <input
              key="file"
              name="file"
              type="file"
              onChange={(e) => handleChange(e.target.files)}
            />
            <button key="submit" type="submit" onClick={submitData}>
              Cargar archivo
            </button>
          </form>
        </Col>
      </Row>

      <Divider orientation={'center'} />
      <Table
        dataSource={dataSearch}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay estudiantes registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default StudentList
