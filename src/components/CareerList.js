import React, { useContext, useState } from 'react'
import { Button, Empty, Popconfirm, Table, Select, Tag} from 'antd'
import { useDataList } from '../data/useDataList'
import ModalContext from '../context/ModalContext'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const { Option } = Select
const CareerList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('careers')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const deleteCareers = async (record) => {
    setIsSubmitting(true)
    await deleteObject('careers', record.id)
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
      title: "id - Nombre - Pensum - Nivel - Facultad - Estado - Acciones",
      render: (record) => (
        <React.Fragment>
          {record.id}
          <br />
          <br />
          {record.name}
          <br />
          <br />
          {record.pensum}
          <br />
          <br />
          {record.levels}
          <br />
          <br />
          {record.faculty.name}
          <br />
          <br />
          <>
          {handleChangeStatus(record.status)}
        </>
          <br />
          <br /> 
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
            onConfirm={() => deleteCareers(record)}
          >
            <Button size="middle">Eliminar</Button>
          </Popconfirm>
        </>
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
      responsive: ["sm"],
    },
    {
      title: 'Carrera',
      dataIndex: 'name',
      key: 'name',
      responsive: ["sm"],
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'Pensum',
      dataIndex: 'pensum',
      key: 'pensum',
      responsive: ["sm"],
      ...GetColumnSearchProps('pensum'),
    },
    {
      title: 'Nivel',
      dataIndex: 'levels',
      key: 'levels',
      responsive: ["sm"],
      ...GetColumnSearchProps('levels'),
    },
    {
      title: 'Facultad',
      dataIndex: ['faculty', 'name'],
      key: 'faculty_id',
      responsive: ["sm"],
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      responsive: ["sm"],
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
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => (
        <>
          {handleChangeStatus(record)}

        </>
      )

    },
    {
      title: 'Acción',
      key: 'action',
      responsive: ["sm"],
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
            onConfirm={() => deleteCareers(record)}
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
      <Table
        dataSource={dataSearch}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay carreras registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default CareerList
