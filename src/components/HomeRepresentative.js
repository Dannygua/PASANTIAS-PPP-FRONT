/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react'
import InternshipsList from './InternshipsList'
import { Typography } from 'antd'

const { Title } = Typography
const HomeRepresentative = () => {
  return (
    <div>
      <Title>Lista de pasantes a cargo</Title>
      <InternshipsList />
    </div>
  )
}

export default HomeRepresentative
