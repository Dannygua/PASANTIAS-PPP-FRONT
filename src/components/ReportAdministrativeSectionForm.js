/**
 * Created by chalosalvador on 9/29/20
 */
import React, { useState } from 'react'
import { Form, Input, Radio, Select } from 'antd'
import { formItemLayout } from '../utils/form'

const { Option } = Select

const ReportAdministrativeSectionForm = ({ form, onSubmit, internship }) => {
  const [commissionApproves, setCommissionApproves] = useState(false)

  return (
    <Form
      {...formItemLayout}
      onFinish={onSubmit}
      form={form}
      name="report-commission"
      initialValues={internship}
    >
      <Form.Item
        name="commission_approves"
        label="¿Recomiendas que otros estudiantes realicen sus ppp en esta Institución o Empresa?"
        rules={[
          {
            required: true,
            message: 'Selecciona si o no.',
          },
        ]}
      >
        <Radio.Group
          onChange={(e) => setCommissionApproves(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value={1}>Si</Radio.Button>
          <Radio.Button value={0}>No</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {!commissionApproves && (
        <Form.Item
          name="set_status_to"
          label="Observaciones para:"
          rules={[
            {
              required: true,
              message:
                'Indica que persona debe realizar correcciones en el informe.',
            },
          ]}
        >
          <Select autoSize={{ maxRows: 4 }}>
            <Option value="in_progress">Estudiante</Option>
            <Option value="representative_pending">Empresa</Option>
            <Option value="tutor_pending">Tutor</Option>
          </Select>
        </Form.Item>
      )}

      <Form.Item
        name="commission_observations"
        label="Observaciones"
        rules={[
          {
            required: !commissionApproves,
            whitespace: true,
            message:
              'Debes indicar la razón por la que no se debe aprobar este informe.',
          },
          {
            min: 40,
            message: 'Debes ingresar al menos 40 caracteres.',
          },
        ]}
      >
        <Input.TextArea autoSize={{ maxRows: 4 }} />
      </Form.Item>
    </Form>
  )
}

export default ReportAdministrativeSectionForm
