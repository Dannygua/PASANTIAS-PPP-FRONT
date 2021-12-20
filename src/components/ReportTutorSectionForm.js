/**
 * Created by chalosalvador on 9/21/20
 */
import React, { useState } from 'react'
import { Form, Input, Radio } from 'antd'
import { formItemLayout } from '../utils/form'

const ReportTutorSectionForm = ({ form, onSubmit, internship }) => {
  const [tutorRecommends, setTutorRecommends] = useState(
    internship.tutor_recommends
  )
  const [tutorKnowledgeContribution, setTutorKnowledgeContribution] = useState(
    internship.tutor_knowledge_contribution
  )
  const [tutorRecommendsApproval, setTutorRecommendsApproval] = useState(
    internship.tutor_recommends_approval
  )

  return (
    <Form
      {...formItemLayout}
      onFinish={onSubmit}
      form={form}
      name="report-tutor"
      initialValues={internship}
    >
      <Form.Item
        name="tutor_observations"
        label="Novedades reportadas por el estudiante/empresa:"
        rules={[
          {
            required: true,
            whitespace: true,
            message:
              'Debes ingresar novedades detectadas en el desarrollo de la práctica.',
          },
          {
            min: 40,
            message: 'Debes ingresar al menos 40 caracteres.',
          },
        ]}
      >
        <Input.TextArea autoSize={{ maxRows: 4 }} />
      </Form.Item>

      <Form.Item
        label="¿Recomiendas que otros estudiantes realicen sus ppp en esta Institución o Empresa?"
        required
      >
        <Form.Item
          name="tutor_recommends"
          rules={[
            {
              required: true,
              message: 'Selecciona si o no.',
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setTutorRecommends(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value={1}>Si</Radio.Button>
            <Radio.Button value={0}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="tutor_recommends_observations"
          rules={[
            {
              required: !tutorRecommends,
              whitespace: true,
              message:
                'Debes indicar la razón por la que no recomiendas a esta empresa.',
            },
            {
              min: 40,
              message: 'Debes ingresar al menos 40 caracteres.',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Indica la razón por la que recomiendas o no para que más estudiantes hagan sus ppp en esta empresa."
            autoSize={{ maxRows: 4 }}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item
        label="En general, ¿las ppp realizadas por el estudiante aportaron a su formación profesional, es decir aportaron a cumplir con su perfil de egreso?"
        required
      >
        <Form.Item
          name="tutor_knowledge_contribution"
          rules={[
            {
              required: true,
              message: 'Selecciona si o no.',
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setTutorKnowledgeContribution(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value={1}>Si</Radio.Button>
            <Radio.Button value={0}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="tutor_knowledge_contribution_observations"
          rules={[
            {
              required: !tutorKnowledgeContribution,
              whitespace: true,
              message:
                'Debes indicar la razón por la que consideras que las ppp no aportaron los conocimientos suficientes al estudiante.',
            },
            {
              min: 40,
              message: 'Debes ingresar al menos 40 caracteres.',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Indica la razón por la que consideras o no que las ppp aportaron conocimiento relevante al estudiante."
            autoSize={{ maxRows: 4 }}
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="¿Recomienda la aprobación de las prácticas preprofesionales del estudiante?">
        <Form.Item
          name="tutor_recommends_approval"
          rules={[
            {
              required: true,
              message: 'Selecciona si o no.',
            },
          ]}
        >
          <Radio.Group
            onChange={(e) => setTutorRecommendsApproval(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value={1}>Si</Radio.Button>
            <Radio.Button value={0}>No</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="tutor_recommends_approval_observations"
          rules={[
            {
              required: !tutorRecommendsApproval,
              whitespace: true,
              message:
                'Debes indicar la razón por la que no recomiendas la aprobación de estas ppp.',
            },
            {
              min: 40,
              message: 'Debes ingresar al menos 40 caracteres.',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Indica la razón por la que no recomiendas la aprobación de estas ppp."
            autoSize={{ maxRows: 4 }}
          />
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default ReportTutorSectionForm
