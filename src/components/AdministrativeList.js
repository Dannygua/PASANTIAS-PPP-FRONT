import React, { useContext, useState} from 'react'
import {
  Button, Empty, Popconfirm, Table, Tag
} from 'antd'
import ModalContext from '../context/ModalContext'
import { useDataList } from '../data/useDataList'
import ShowError from './ShowError'
import { deleteObject } from '../utils/formActions'
import {
  CheckCircleOutlined,
  CloseCircleOutlined

} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const AdministrativeList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const DataSet = (record, form) => {
    setShowModal(true)
    setEdit(true)
    setRegister(record)
    setForm(form)
  }
  const { dataSearch, isLoading, isError } = useDataList('administratives')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const deleteAdministrative = async (record) => {
    setIsSubmitting(true)
    await deleteObject('administratives', record.administrative_id)
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
      title: "id - Nombre - Apellido - Facultad - Estado - Acciones",
      render: (record) => (
        <React.Fragment>
          {record.administrative_id}
          <br />
          <br />
          {record.administrative_name}
          <br />
          <br />
          {record.administrative_lastname}
          <br />
          <br />
          {record.faculty}
          <br />
          <br />
          <>
          {handleChangeStatus(record.administrative_status)}
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
            onConfirm={() => deleteAdministrative(record)}

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
      title: 'Nombre',
      dataIndex: 'administrative_name',
      key: 'administrative_name',
      responsive: ["sm"],
      ...GetColumnSearchProps('administrative_name'),
    },
    {
      title: 'Apellido',
      dataIndex: 'administrative_lastname',
      key: 'administrative_lastname',
      responsive: ["sm"],
      ...GetColumnSearchProps('administrative_name'),
    },
    {
      title: 'Facultad',
      dataIndex: 'faculty',
      key: 'faculty',
      responsive: ["sm"],
      ...GetColumnSearchProps('faculty'),
    },
    {
      title: 'Estado',
      dataIndex: 'administrative_status',
      key: 'administrative_status',
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
      onFilter: (value, record) => record.administrative_status.indexOf(value) === 0,
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
            onConfirm={() => deleteAdministrative(record)}

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
            description={<span>No hay administrativos registradas</span>}
          />
        ),
      }}
    />
  )
}

export default AdministrativeList
