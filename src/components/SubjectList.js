import React, { useContext, useState, useRef } from 'react'
import { Button, Select, Table, Divider, Empty, Popconfirm, Tag} from 'antd'
import { useDataList } from '../data/useDataList'
import { deleteObject } from '../utils/formActions'
import ModalContext from '../context/ModalContext'
import ShowError from './ShowError'
import {
  CheckCircleOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const { Option } = Select

const SubjectList = (props) => {
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

  const deleteSubject = async (record) => {
    setIsSubmitting(true)
    await deleteObject('subjects', record.id)
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

  const getFilters = () =>{
    const filters = [];
    if(dataSearch){
      dataSearch.forEach((datos1)=> {
        var filter = {text: datos1.name , value: datos1.name};
        filters.push(filter);
      });
      return filters;
    }else{
      return [];
    }
  }

  const getDataSource = () =>{
    if(dataSearch){
      const datos2 = [];
      dataSearch.forEach((datos1)=>{
        datos1.subjects.forEach((subject)=>{
          var dato = {
            'id' : subject.id,
            'name' : subject.name,
            'code' : subject.code,
            'level' : subject.level,
            'unit' : subject.unit,
            'status' : subject.status,
            'field' : subject.field,
            'career' : datos1.name,
            'career_id' : datos1.id,
            'topics': subject.topics,
          };
          datos2.push(dato);
        });
      });
      return datos2;
    }else{
      return [];
    }
  }

  const columns = [
    {
      id: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'NOMBRE',
      dataIndex: 'name',
      key: 'name',
      ...GetColumnSearchProps('name'),
    },
    {
      title: 'CODIGO',
      dataIndex: 'code',
      key: 'code',
      ...GetColumnSearchProps('code'),
    },
    {
      title: 'NIVEL',
      dataIndex: 'level',
      key: 'level',
      ...GetColumnSearchProps('level'),
    },
    {
      title: 'UNIDAD',
      dataIndex: 'unit',
      key: 'unit',
      ...GetColumnSearchProps('unit'),
    },
    {
      title: 'CARRERA',
      dataIndex: 'career',
      key: 'career',
      filters: getFilters(),
      onFilter: (value, record) => record.career.indexOf(value) === 0,
    },

    {
      title: 'ESTADO',
      dataIndex: 'status',
      key: 'status',
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
            onConfirm={() => deleteSubject(record)}
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
        dataSource={getDataSource()}
        columns={columns}
        rowKey={(record) => record.id}
        loading={isLoading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>No hay materias registradas</span>}
            />
          ),
        }}
      />
    </>
  )
}

export default SubjectList
