import React from 'react'
import { Card, Typography } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'
import StudentList from '../components/StudentList'

const { Title } = Typography
const StudentPage = () => {
  return (
    <>
      <ModalContextProvider>
        <Card extra={<Actions form="StudentForm" title="NUEVO ESTUDIANTE" />}>
          <Title>Estudiantes</Title>
          <StudentList form="StudentForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(StudentPage)
