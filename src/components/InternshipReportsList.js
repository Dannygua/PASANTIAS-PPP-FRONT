/**
 * Created by chalosalvador on 9/9/20
 */
import React, { useState } from 'react'
import { useInternshipReportsList } from '../data/useInternshipReportsList'
import ShowError from './ShowError'
import { Button, Drawer, Table } from 'antd'
import moment from 'moment'
import InternshipReportDetail from './InternshipReportDetail'

const InternshipReportsList = ({ internshipId }) => {
  const { reports, isLoading, isError } = useInternshipReportsList(internshipId)
  const [report, setReport] = useState(null)

  const columns = [
    {
      title: 'Fecha de creación',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Fecha de inicio',
      dataIndex: 'from_date',
      key: 'from_date',
    },
    {
      title: 'Fecha de fin',
      dataIndex: 'to_date',
      key: 'to_date',
    },
    {
      title: 'Horas trabajadas',
      dataIndex: 'hours_worked',
      key: 'hours_worked',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (value, internshipReport) => {
        return (
          <Button
            type="link"
            onClick={() => handleViewReportDetail(internshipReport)}
          >
            Ver detalles
          </Button>
        )
      },
    },
  ]

  const handleViewReportDetail = (internshipReport) => {
    console.log('internshipReport', internshipReport)
    setReport(internshipReport)
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (isError) {
    return <ShowError error={isError} />
  }

  const getDataSource = () => {
    if (reports) {
      return reports.map((report) => ({
        ...report,
        key: report.id,
        created_at: moment(report.created_at).format('DD/MM/YYYY HH:mm:ss'),
        from_date: moment(report.from_date).format('DD/MM/YYYY'),
        to_date: report.to_date && moment(report.to_date).format('DD/MM/YYYY'),
        hours_worked: report.hours_worked,
        status: report.status,
        // type: report.type,
      }))
    } else {
      return []
    }
  }

  return (
    <>
      <Table
        dataSource={getDataSource()}
        columns={columns}
        // rowKey={ record => record.id }
        loading={isLoading}
        summary={(reports) => {
          let totalHoursApproved = 0
          let totalHoursPending = 0
          reports.forEach(({ hours_worked, status }) => {
            if (status === 'approved' || status === 'registered') {
              totalHoursApproved += hours_worked
            } else {
              totalHoursPending += hours_worked
            }
          })
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  Total de horas aprobadas
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  {totalHoursApproved}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell colSpan={3}>
                  Total de horas pendientes
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  {totalHoursPending}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          )
        }}
        pagination={false}
        // onChange={ ( pagination ) => setPageIndex( pagination.current ) }
      />

      <Drawer
        closable={false}
        onClose={() => setReport(null)}
        visible={!!report}
        placement="right"
        // height='80%'
        width="1100px"
        destroyOnClose
      >
        {report && <InternshipReportDetail report={report} />}
      </Drawer>
    </>
  )
}

export default InternshipReportsList
