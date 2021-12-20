import React, {useState, useEffect} from 'react'
import withAuth from '../hocs/withAuth'
import { useParams } from 'react-router-dom'
import {Result, Button, message} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import API from "../data";
import ErrorList from "../components/ErrorList";
import {translateMessage} from "../utils/translateMessage";

const ReportPage = () => {
  const { id } = useParams()
  const [finished, setFinished] = useState(true)

  useEffect(()=>{
      async function fetchGetReport(){
        const hide = message.loading({
          content: 'Enviando email reporte...',
        })
        try {
          await API.get(`/internships/${id}/report`)
          hide()
          setFinished(true);
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />
          message.error(
              <>
                {translateMessage(e.message)}
                {errorList}
              </>
          )
          hide()
          setFinished(false);
        }
      }
    fetchGetReport()
  },[id])

  return (
      <>
        { finished ? (
          <Result
              status="success"
              icon={<SmileOutlined />}
              title="Enviar reporte a correo"
              subTitle="Revise su correo electronico para ver el reporte final de PPP..."
              extra={[<Button
                  type="primary"
                  key="console"
              >
                ¡Gracias!
              </Button>]}
          />):(
            <Result
                status="error"
                title="Existio un error enviando el reporte a su correo"
                subTitle="Por favor inténtelo nuevamente, si no se soluciona intentelo mas tarde..."
                extra={[
                  <Button type="primary" key="console">
                    Enviar Reporte
                  </Button>,
                ]}
            />
        )
        }
      </>
  )
}

export default withAuth(ReportPage)