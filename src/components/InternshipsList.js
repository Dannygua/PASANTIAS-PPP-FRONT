import React, { useState, useRef } from 'react'
import { Empty, Table, Tag} from 'antd'
import { useInternshipsList } from '../data/useInternshipsList'
import ShowError from './ShowError'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Routes from '../constants/routes'
import { useAuth } from '../providers/Auth'
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import GetColumnSearchProps from "./GetColumnSearchProps";
const InternshipsList = () => {
  const [pageIndex, setPageIndex] = useState(1)
  const { internships, meta, isLoading, isError } =
    useInternshipsList(pageIndex)
  const { currentUser } = useAuth()
  const handleChangeStatus = (record) => {

    if ((record + "") == "undefined") {
      return (
        <div>
          <Tag icon={<CloseCircleOutlined />} color="error">Sin tutor </Tag>

        </div>
      )
    } else {
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="success">{record}</Tag>

        </div>
      )
    }
  }

  const handleChangeStatusInterships = (record) => {

    if ((record + "") === "rejected") {
      return (
        <div>
          <Tag icon={<CloseCircleOutlined />} color="error">Rechazado</Tag>

        </div>
      )
    } else if ((record + "") === "approved") {
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="success">Aprobado</Tag>

        </div>
      )
    } else if ((record + "") === "pending") {
      return (
        <div>
          <Tag icon={<ExclamationCircleOutlined />} color="default">Pendiente</Tag>

        </div>
      )
    } else if ((record + "") === "registered") {
      return (
        <div>
          <Tag icon={<CheckCircleOutlined />} color="orange">Registrado</Tag>

        </div>
      )
    } else if ((record + "") === "in_progress") {
      return (
        <div>
          <Tag icon={<SyncOutlined spin />} color="processing">En Progreso</Tag>

        </div>
      )
    }
    else if ((record + "") === "commission_pending") {
      return (
        <div>
          <Tag icon={<ExclamationCircleOutlined />} color="default">Aprobacion pendiente Comision</Tag>

        </div>
      )
    }
    else if ((record + "") === "tutor_pending") {
      return (
        <div>
          <Tag icon={<ExclamationCircleOutlined />} color="default">Aprobacion pendiente Tutor</Tag>

        </div>
      )
    }
    else if ((record + "") === "representative_pending") {
      return (
        <div>
          <Tag icon={<ExclamationCircleOutlined />} color="default">Aprobacion pendiente Representativo</Tag>

        </div>
      )
    }
  }
  const status = (internship) => {
    switch(internship.status) {
      case "registered":
        return <>
          <Link to={Routes.REPORT_ID.replace(':id', internship.key)}>
            Reporte
          </Link></>;
      default:
        return <></>
    }
  }

  const columns = [
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Estudiante',
      dataIndex: 'student',
      key: 'student',
      ...GetColumnSearchProps('student'),
    },
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      ...GetColumnSearchProps('company'),
    },
    {

      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
      ...GetColumnSearchProps('tutor'),
      render: (record) => (
        <>
          {handleChangeStatus(record)}

        </>
      )

    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'start_date',
      key: 'start_date',
      ...GetColumnSearchProps('start_date'),
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'finish_date',
      key: 'finish_date',
      ...GetColumnSearchProps('finish_date'),
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      ...GetColumnSearchProps('type'),
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Aprobado',
          value: 'approved',
        },
        {
          text: 'Rechazado',
          value: 'rejected',
        },
        {
          text: 'Pendiente',
          value: 'pending',
        },
        {
          text: 'Registrado',
          value: 'registered',
        },
        {
          text: 'En Progreso',
          value: 'in_progress',
        },
        {
          text: 'Aprobacion Comision',
          value: 'commission_pending',
        },
        {
          text: 'Aprobacion Tutor',
          value: 'tutor_pending',
        },
        {
          text: 'Aprobacion pendiente Representativo',
          value: 'representative_pending',
        },

      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => (
        <>
          {handleChangeStatusInterships(record)}

        </>
      )
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (value, internship) => {
        return (
          <>
          <Link to={Routes.INTERNSHIP_ID.replace(':id', internship.key)}>
            Ver detalles
          </Link>
          {' '}
          {status(internship)}
          </>
        )
      },
    },
  ]

  let pagination = {
    current: 1,
    pageSize: 10,
    total: 10,
    showSizeChanger: false,
  }

  if (isError) {
    return <ShowError error={isError} />
  }

  const getDataSource = () => {
    if (internships) {
      return internships.map((internship) => ({
        key: internship.id,
        created_at: moment(internship.created_at).format('DD/MM/YYYY HH:mm:ss'),
        start_date: moment(internship.start_date).format('DD/MM/YYYY'),
        finish_date:
          internship.finish_date &&
          moment(internship.finish_date).format('DD/MM/YYYY'),
        type: internship.type,
        student: `${internship.student.name} ${internship.student.lastname}`,
        tutor:
          internship.teacher &&
          `${internship.teacher.name} ${internship.teacher.lastname}`,
        company: internship.company && internship.company.name,
        status: internship.status,
      }))
    } else {
      return []
    }
  }

  if (meta) {
    pagination = {
      current: meta.current_page,
      pageSize: meta.per_page,
      total: meta.total,
      showSizeChanger: false,
    }
  }

  return (
    <Table
      dataSource={getDataSource()}
      columns={columns}
      rowKey={(record) => record.key}
      pagination={pagination}
      loading={isLoading}
      onChange={(pagination) => setPageIndex(pagination.current)}
      locale={{
        emptyText: (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>No hay prácticas preprofesionales registradas</span>
            }
          />
        ),
      }}
    />
  )
}

export default InternshipsList
