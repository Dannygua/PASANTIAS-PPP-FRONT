/**
 * Created by chalosalvador on 3/1/20
 */
import React from 'react'
import Navigation from './Navigation'
import { Col, Layout, Row } from 'antd'
import logoEsfot from '../images/esfotBuhoLetras.svg'
import { useAuth } from '../providers/Auth'
import MenuUser from './MenuUser'

const Header = Layout.Header
const Content = Layout.Content

/**
 * Este componente renderiza los elementos comunes para toda la aplicación
 *
 * Header (menu), Content y Footer
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MainLayout = (props) => {
  // console.log('props', props)

  const { isAuthenticated, isCheckingAuth, currentUser } = useAuth()
  console.log(currentUser)

  return (
    <div className="app">
      <Layout>
        <Header className="header">
          <Row type="flex" justify="space-between" align="bottom">
            <Col xs={24} md={6} className="logo-wrapper">            
              <img className="logo" src={logoEsfot} alt="ESFOT"/>
            </Col>
            <Col md={14} align="right" className="main-menu">
              <Navigation mode="horizontal" />
            </Col>
          </Row>
        </Header>

        <Layout>
          {isAuthenticated ? <MenuUser /> : null}
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content className="content">
              <Row type="flex" justify="center" style={{ flex: 'auto' }}>
                <Col xs={24} md={24}>
                  {props.children}
                </Col>
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}

export default MainLayout
