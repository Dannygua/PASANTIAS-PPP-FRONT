import React, { useContext } from 'react'
import { Button } from 'antd'
import { useDataList } from '../data/useDataList'
import ModalContext from '../context/ModalContext'
import TableDefault from './TableDefault'
const SubjectList = (props) => {
  const { setShowModal, setEdit, setRegister, setForm } =
    useContext(ModalContext)
  const { dataSearch } = useDataList('topics')

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ID_CARRERA - b.ID_CARRERA,
    },
    {
      title: 'NOMBRE',
      dataIndex: 'name',
    },
    {
      title: 'Materia',
      dataIndex: 'subject_id',
    },
    {
      title: 'Acción',
      key: 'action',
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setShowModal(true)
              setEdit(true)
              setRegister(record)
              setForm(props.form)
            }}
            size="middle"
          >
            Editar
          </Button>
          <Button size="middle">Eliminar</Button>
        </>
      ),
    },
  ]
  console.log(dataSearch)
  return (
    <div>
      <TableDefault columns={columns} title="TEMAS" dataSource={dataSearch} />
    </div>
  )
}

export default SubjectList
