import React from 'react'
import { Card, Typography } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'

import TeacherList from '../components/TeacherList'

const { Title } = Typography
const TeacherPage = () => {
  return (
    <>
      <ModalContextProvider>
        <Card extra={<Actions form="TeacherForm" title="NUEVO PROFESOR" />}>
          <Title>Profesores</Title>
          <TeacherList form="TeacherForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}
export default withAuth(TeacherPage)
