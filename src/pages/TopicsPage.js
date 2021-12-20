import React from 'react'
import { Card } from 'antd'
import withAuth from '../hocs/withAuth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import Actions from '../components/Actions'
import TopicList from '../components/TopicList'

const Topics = () => {
  return (
    <>
      <ModalContextProvider>
        <Card
          title={<h3>TEMAS</h3>}
          extra={<Actions form="TopicForm" title="NUEVO TEMA" />}
        >
          <TopicList form="TopicForm" />
        </Card>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(Topics)
