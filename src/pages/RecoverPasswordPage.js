import React, {  useContext, useState, Redirect } from 'react'
import withoutAuth from '../hocs/withoutAuth'
import ModalContext from '../context/ModalContext'
import { RecoverData } from '../utils/formActions'
import { Button, Card, Input} from 'antd'
import { Form } from 'antd'

const RecoverPasswordPage = () => {
  const { setShowModal } = useContext(ModalContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  }
  const RecoverPassword = async (values) => {
    setIsSubmitting(true)
    await RecoverData('Enviando Datos','Tus credenciales fueron enviadas a tu correo','email', values)
    setIsSubmitting(false)
  }
  return (
    <>
        <div className="BodyCard">
          <div>
          <Card>
              <Form 
              onFinish={RecoverPassword}

              {...layout} name="nest-messages">
              <Form.Item className="TitleFormDefault">
                  <div className="TitleFormDefault">
                    <p>ENVIO DE CREDENCIALES</p>
                  </div>
                </Form.Item>
                <br></br>
                <Form.Item name="email" label="Escriba su Correo"
                rules={[
                  {
                    required: true,
                    message: 'Escriba su correo',
                  },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item>
        <Button htmlType="submit" loading={isSubmitting}>
          Enviar
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

    </>
  )
}

export default withoutAuth(RecoverPasswordPage)
