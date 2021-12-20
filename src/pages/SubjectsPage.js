import React from 'react'
import { Card, Typography } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'

import SubjectList from '../components/SubjectList'

const { Title } = Typography
const Subjects = () => {
  return (
    <>
      <ModalContextProvider>
        <Card extra={<Actions form="SubjectForm" title="NUEVA MATERIA" />}>
          <Title>Materias</Title>
          <SubjectList form="SubjectForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(Subjects)
