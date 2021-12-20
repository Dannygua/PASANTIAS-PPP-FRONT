import React, { useContext, useState } from 'react'
import {
  Button, Empty, Popconfirm, Table, Tag } from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'

import {
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const TeacherList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('teachers')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteTeacher = async (record) => {
    setIsSubmitting(true)
    await deleteObject('teachers', record.teacher_id)
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
      dataIndex: 'teacher_id',
      key: 'teacher_id',
    },
    {
      title: 'Nombre',
      dataIndex: 'teacher_name',
      key: 'teacher_name',
      ...GetColumnSearchProps('teacher_name'),
    },
    {
      title: 'Apellido',
      dataIndex: 'teacher_lastname',
      key: 'teacher_lastname',
      ...GetColumnSearchProps('teacher_lastname'),
    },
    {
      title: 'Profesión',
      dataIndex: 'degree',
      key: 'degree',
      ...GetColumnSearchProps('degree'),
    },
    {
      title: 'Carrera',
      dataIndex: 'career',
      key: 'career',
      ...GetColumnSearchProps('career'),
    },
    {
      title: 'Estado',
      dataIndex: 'teacher_status',
      key: 'teacher_status',
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
      onFilter: (value, record) => record.teacher_status.indexOf(value) === 0,
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
            onConfirm={() => deleteTeacher(record)}
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
    <Table
      dataSource={dataSearch}
      columns={columns}
      rowKey={(record) => record.id}
      loading={isLoading}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No hay facultades registradas</span>}
          />
        ),
      }}
    />
  )
}

export default TeacherList
