import React, { useEffect, useState } from 'react'
import Routes from '../constants/routes'
import { useAuth } from '../providers/Auth'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
const Sider = Layout.Sider
const MenuUser = () => {
  const { currentUser } = useAuth()
  const [currentRoutes, setCurrentRoutes] = useState([])
  useEffect(() => {
    switch (currentUser.role) {
      case 'ROLE_ADMINISTRATIVE':
        setCurrentRoutes(Routes.adminRoutes)
        console.log(Routes.adminRoutes)
        break
    }
  }, [])

  return (
    <Sider width={200} className="site-layout-background">
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        theme="dark"
      >
        {currentRoutes.map((singleRoute) => (
          <Menu.Item key={singleRoute.url}>
            <Link to={singleRoute.url}>{singleRoute.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

export default MenuUser
