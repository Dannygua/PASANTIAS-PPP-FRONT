import React from 'react'
import { Card, Typography } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'

import AdministrativeList from '../components/AdministrativeList'

const { Title } = Typography
const AdministrativePage = () => {
  return (
    <>
      <ModalContextProvider>
        <Card
          extra={
            <Actions form="AdministrativeForm" title="NUEVO ADMINISTRADOR" />
          }
        >
          <Title>Administrativos</Title>
          <AdministrativeList form="AdministrativeForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(AdministrativePage)
