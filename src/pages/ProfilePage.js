import React, { useState } from 'react'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/Auth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import { Button, Card } from 'antd'
import { Form } from 'antd'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  }
  return (
    <>
      <ModalContextProvider>
        <div className="BodyCard">
          <div>
            <Card
              hoverable              
            >
              <Form {...layout} name="nest-messages">
                <Form.Item className="TitleFormDefault">
                  <div className="TitleFormDefault">
                    <p>INFORMACION PERFIL</p>
                  </div>
                </Form.Item>
                <Form.Item name="NOMBRE" label="NOMBRE">
                  <label>{currentUser && currentUser.name}</label>
                </Form.Item>
                <Form.Item name="Apellidos" label="APELLIDOS">
                  <label>{currentUser && currentUser.lastname}</label>
                </Form.Item>
                <Form.Item name="EMAIL" label="EMAIL">
                  <label>{currentUser && currentUser.email}</label>
                </Form.Item>
                <Form.Item name="TELEFONO" label="TELEFONO">
                  <label>{currentUser && currentUser.phone}</label>
                </Form.Item>
              </Form>
            </Card>
          </div>
          <style jsx>{`
            img {
              padding-left: 35%;
              padding-right: 35%;
              padding-top: 3%;
            }
          `}</style>
        </div>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(ProfilePage)
