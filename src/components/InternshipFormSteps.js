/**
 * Created by chalosalvador on 9/12/20
 */
import React, { useState } from 'react'
import {
  Button,
  Col,
  Divider,
  Form,
  message,
  Modal,
  Result,
  Row,
  Steps,
} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import API from '../data'
import { mutate } from 'swr'
import ErrorList from './ErrorList'
import { translateMessage } from '../utils/translateMessage'
import InternshipForm from './InternshipForm'
import RepresentativeStep from './RepresentativeStep'
import CompanyStep from './CompanyStep'
import moment from 'moment'

const { Step } = Steps
const { confirm } = Modal

const InternshipFormSteps = ({ internship, ...props }) => {
  const [companyForm] = Form.useForm()
  const [representativeForm] = Form.useForm()
  const [internshipForm] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [finished, setFinished] = useState(false)

  const steps = [
    {
      title: 'Empresa',
      content: <CompanyStep form={companyForm} />,
      form: companyForm,
    },
    {
      title: 'Responsable',
      content: (
        <RepresentativeStep
          representatives={companyForm.getFieldValue('representatives')}
          form={representativeForm}
        />
      ),
      form: representativeForm,
    },
    {
      title: 'Práctica',
      content: <InternshipForm form={internshipForm} />,
      form: internshipForm,
    },
  ]

  const next = async () => {
    try {
      const values = await steps[current].form.validateFields()
      console.log('values', values)
      setCurrent((prevState) => prevState + 1)
    } catch (e) {
      console.log('next error', e)
    }
  }
  const prev = () => setCurrent((prevState) => prevState - 1)

  const handleCreate = async () => {
    // try {
    const values = await steps[current].form.validateFields()
    confirm({
      title: '¿Confirmas que deseas enviar el formulario?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Se perderá toda la información ingresada.',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        console.log('values', values)
        const messageKey = 'saving-status'
        try {
          setIsSubmitting(true)
          const companyData = companyForm.getFieldsValue()
          const representativeData = representativeForm.getFieldsValue()
          const internshipData = internshipForm.getFieldsValue()
          let companyId = companyData.id

          if (!companyId) {
            // crear empresa
            message.loading({
              content: 'Guardando los datos de la empresa...',
              key: messageKey,
            })
            const company = await API.post('/companies', companyData)
            companyId = company.data.id
            console.log('company created', company)
          }

          let representativeId = representativeData.id
          if (!representativeId) {
            // crear representante
            message.loading({
              content: 'Guardando los datos del representante...',
              key: messageKey,
            })
            const representative = await API.post(
              `/companies/${companyId}/representatives`,
                representativeData
            )
            representativeId = representative.data.representative_id
            console.log('representative created', representative)
          }else{
            representativeId = representativeData.id;
          }

          // crear practica
          message.loading({
            content: 'Guardando los datos de la práctica...',
            key: messageKey,
          })
          internshipData.representative_id = representativeId
          internshipData.start_date = moment(internshipData.start_date).format(
            'YYYY-MM-DD'
          )
          const internship = await API.post('/internships', internshipData)
          await mutate(`/internships?page=1`)

          message.success({
            content: '¡Listo!',
            key: messageKey,
          })
          console.log('intershipcreated', internship)

          companyForm.resetFields()
          representativeForm.resetFields()
          internshipForm.resetFields()
          //props.onFinish();//setShowModal( false );
          setFinished(true)
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />
          message.error({
            content: (
              <>
                {translateMessage(e.message)}
                {errorList}
              </>
            ),
            key: messageKey,
          })
        }
        setIsSubmitting(false)
      },
      onCancel() {},
    })
    // } catch( e ) {
    //
    // }
  }

  const handleEdit = async (values) => {
    confirm({
      title: '¿Confirmas que deseas enviar el formulario?',
      icon: <ExclamationCircleOutlined />,
      // content: 'Se perderá toda la información ingresada.',
      okText: 'Sí',
      cancelText: 'No',
      onOk: async () => {
        console.log('values', values)
        try {
          setIsSubmitting(true)
          await API.put(`/internships/${internship.id}`, values)

          await mutate(`/internships/${internship.id}`)
          await mutate(`/internships`)
          companyForm.resetFields()
          message.success(
            'La solicitud de prácticas se ha modificado correctamente.'
          )
        } catch (e) {
          const errorList = e.error && <ErrorList errors={e.error} />
          message.error(
            <>
              {translateMessage(e.message)}
              {errorList}
            </>
          )
        }
        setIsSubmitting(false)
      },
      onCancel() {},
    })
  }

  return (
    <>
      {!finished ? (
        <>
          <Steps current={current} style={{ marginBottom: 40 }}>
            {steps.map((step, i) => (
              <Step key={`step-${i}`} title={step.title} />
            ))}
          </Steps>

          {steps.map((step, i) => (
            <div key={`step-content-${i}`} hidden={i !== current}>
              {steps[i].content}
            </div>
          ))}
          {/*</Form.Provider>*/}

          <Divider />
          <Row justify="between">
            <Col span={12}>
              {current > 0 && <Button onClick={prev}>Anterior</Button>}
            </Col>
            <Col span={12} align="right">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Siguiente
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={handleCreate}>
                  Enviar solicitud
                </Button>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Result
          status="success"
          title="¡Los datos de la práctica se han guardado correctamente!"
          subTitle="Antes de poder registrar tus reportes, la práctica debe ser autorizada por la ESFOT."
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => props.onFinish()}
            >
              ¡Entendido!
            </Button>,
          ]}
        />
      )}
    </>
  )
}

export default InternshipFormSteps
