import React, { useState } from 'react'
import withAuth from '../hocs/withAuth'
import { useAuth } from '../providers/Auth'
import ModalContext, { ModalContextProvider } from '../context/ModalContext'
import { Button, Card, Input } from 'antd'
import { Form } from 'antd'
import { EditPassword } from '../utils/formActions'

const ChangePasswordPage = () => {
  const { currentUser } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  }
  const user = currentUser && currentUser.id

  const ChangePassword = async (values) => {
    setIsSubmitting(true)
    await EditPassword('user', values, user)
    setIsSubmitting(false)

  }
  return (
    <>
      <ModalContextProvider>
        <div className="BodyCard">
          <div>
            <Card>
              <Form
                onFinish={ChangePassword}
                {...layout} name="nest-messages">
                <Form.Item className="TitleFormDefault">
                  <div className="TitleFormDefault">
                    <p>CAMBIO DE CREDENCIALES</p>
                  </div>
                </Form.Item>
                <Form.Item name="currentPassword" label="Escriba su contraseña actual"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba la contraseña',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="password" label="Escriba su nueva Contraseña"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba la contraseña',
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item dependencies={['password']} name="confirmPassword " label="Vuelva a escribir su nueva Contraseña"
                  rules={[
                    {
                      required: true,
                      message: 'Escriba la contraseña',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Las contraseñas no coinciden'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item className="button">
                  <Button className="buttonDefault" htmlType="submit" loading={isSubmitting}>
                    ENVIAR
                  </Button>
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
            .button{
              text-align:center;
            }
          `}</style>
        </div>
      </ModalContextProvider>
    </>
  )
}

export default withAuth(ChangePasswordPage)
