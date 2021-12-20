import React from 'react'
import { Card } from 'antd';
import { Col, Row } from 'antd'
import { Carousel } from 'antd'
import ESFOT1 from '../images/ESFOT1.jpg'
import ESFOT2 from '../images/ESFOT2.jpg'
import ESFOT3 from '../images/ESFOT3.jpg'
import ESFOT4 from '../images/ESFOT4.jpg'
import Anuncio1 from '../images/desarrollo_software.jpg'
import Anuncio2 from '../images/agua_saneamiento.jpg'
import Anuncio3 from '../images/electromecanica.jpg'
import Anuncio4 from '../images/redes_tele-2.jpg'

const { Meta } = Card;

const HomePage = () => {
  return (
    <>
      <div>
        <Carousel effect="fade" autoplay={true}>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio1} />
          </div>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio2} />
          </div>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio3} />
          </div>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio4} />
          </div>
        </Carousel>
        <Card hoverable>
          <Row>
            <Col span={1}>
              <img
                className="AnuncioDefault"
                data-test="EsfotC"
                alt="example"
                src={ESFOT2}
              />
            </Col>

            <Col span={20} offset={1}>
              <Meta
                title="Tecnología Superior en Desarrollo de Software - TSDS"
                description="Los profesionales en Tecnología Superior en Desarrollo de Software, de la Escuela Politécnica Nacional, podrán poner soluciones relacionados al desarrollo, mantenimiento y soporte de aplicaciones software, altamente competentes, con responsabilidad social y espíritu emprendedor, basados en un currículo que permita un proceso de formación teórico práctico con herramientas actualizadas; que aporten en el planteamiento de soluciones innovadoras en el área de desarrollo de software contribuyendo a la vez con la transformación de la matriz productiva del país."
              />
            </Col>
          </Row>
        </Card>
        <Card hoverable>
          <Row>
            <Col span={1}>
              <img
                className="AnuncioDefault"
                data-test="EsfotC"
                alt="example"
                src={ESFOT1}
              />
            </Col>
            <Col span={20} offset={1}>
              <Meta
                title="Tecnología Superior en Agua y Saneamiento Ambiental - TSASA"
                description="Los profesionales en Tecnología Superior en Agua y Saneamiento Ambiental contribuyen en el planteamiento de soluciones ambientales innovadoras para así generar un impacto positivo en la sociedad bajo los lineamientos del Plan Nacional del Buen Vivir y enmarcados en el desarrollo de los Sectores Estratégicos."
              />
            </Col>
          </Row>
        </Card>
        <Card hoverable>
          <Row>
            <Col span={1}>
              <img
                className="AnuncioDefault"
                data-test="EsfotC"
                alt="example"
                src={ESFOT3}
              />
            </Col>
            <Col span={20} offset={1}>
              <Meta
                title="Tecnología Superior en Redes y Telecomunicaciones - TSRT"
                description="Los profesionales en Tecnología Superior de Redes y TelecomunicacIones podrán implementar y brindar soporte tecnológico en el planteamiento de soluciones innovadoras en el área de las Redes y Telecomunicaciones para así aportar al cambio de la matriz productiva del país y al cumplimiento del Plan Nacional del Buen Vivir, comprometidos con la sociedad y el medio ambiente."
              />
            </Col>
          </Row>
        </Card>
        <Card hoverable>
          <Row>
            <Col span={1}>
              <img
                className="AnuncioDefault"
                data-test="EsfotC"
                alt="example"
                src={ESFOT4}
              />
            </Col>
            <Col span={20} offset={1}>
              <Meta
                title="Tecnología Superior en Electromecánica - TSEM"
                description="Los profesionales en Tecnología Superior en Electromecánica poseen destrezas para diseñar, construir, instalar, adaptar y brindar mantenimiento a sistemas electromecánicos para uso industrial o residencial, que contribuyan con el planteamiento de soluciones innovadoras a problemas existentes en los sectores industrial o residencial en las áreas de manufactura, instalaciones eléctricas, automatización y/o manejo eficiente de energía, para así aportar a la consolidación del cambio de las matrices productiva y energética enmarcadas en el Plan Nacional del Buen Vivir y las Agendas de Desarrollo Regional y Zonal."
              />
            </Col>
          </Row>
        </Card>
      </div>
      {/* <style jsx>{`
        .AnuncioDefault {

        }
      `}</style> */}
    </>
  )
}

export default HomePage
