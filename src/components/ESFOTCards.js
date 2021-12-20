import React from 'react'
import { Card, Col, Row } from 'antd'
import PropTypes from 'prop-types'

const { Meta } = Card
const ESFOTCards = (props) => (
  <div>
    <Card hoverable>
      <Row>
        <Col span={3}>
          <img
            className="AnuncioDefault"
            data-test="EsfotC"
            alt="example"
            src={props.image}
          />
        </Col>

        <Col span={20} offset={1}>
          <Meta
            title={props.title}
            description="Las funciones o desempeños de la profesión que se espera que los graduados de la carrera de Tecnología Superior en Agua y Saneamiento Ambiental alcancen dentro de los 3 a 5 años posteriores a su graduación son:
Apoyar en servicios de consultoría para el desarrollo de proyectos de tecnologías en agua y saneamiento ambiental, orientados a la gestión, planeación, análisis, diseño, implementación, operación y mantenimiento de sistemas.
Participar en obras de abastecimiento de agua y saneamiento ambiental, garantizando aspectos de seguridad, calidad y conservación del ambiente, a través de la aplicación de procesos y modelos estándares para la consecución de los objetivos estratégicos de las instituciones, empresas y comunidades.
Operar en forma integral los sistemas de agua y saneamiento ambiental en las áreas urbanas y rurales.
Caracterizar los diferentes tipos de aguas tomando muestras en campo, realizando análisis en el laboratorio e interpretando los resultados obtenidos.
Implementar soluciones innovadoras en obras de abastecimiento de agua y saneamiento ambiental en las organizaciones mediante la evaluación de las tecnologías emergentes en el mercado.
Formar parte de equipos de trabajo multidisciplinarios donde se evidencien sus valores y habilidades, como el liderazgo, ética profesional, disciplina, organización y buenas relaciones interpersonales.
Buscar la constante actualización de conocimientos a través del autoaprendizaje, investigación y educación continua."
          />
        </Col>
      </Row>
    </Card>
  </div>
)
ESFOTCards.propTypes = {
  title: PropTypes.string,
}

export default ESFOTCards
