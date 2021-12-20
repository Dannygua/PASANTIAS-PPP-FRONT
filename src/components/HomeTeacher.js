/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react'
import InternshipsList from './InternshipsList'
import { Typography } from 'antd'

const { Title } = Typography
const HomeTeacher = () => {
  return (
    <div>
      <Title>Tutorias de prácticas preprofesionales</Title>
      <InternshipsList />
    </div>
  )
}

export default HomeTeacher
