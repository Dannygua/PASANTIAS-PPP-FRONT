/**
 * Created by chalosalvador on 9/11/20
 */
import React from 'react'
import HomeAdministrative from '../components/HomeAdministrative'
import { useAuth } from '../providers/Auth'
import withAuth from '../hocs/withAuth'
import HomeTeacher from '../components/HomeTeacher'
import HomeStudent from '../components/HomeStudent'
import HomeRepresentative from '../components/HomeRepresentative'

const HomePage = () => {
  const { currentUser } = useAuth()
  console.log('currentUser', currentUser)
  return (
    <div>
      {currentUser.role === 'ROLE_ADMINISTRATIVE' ? (
        <HomeAdministrative />
      ) : currentUser.role === 'ROLE_TEACHER' ? (
        <HomeTeacher />
      ) : currentUser.role === 'ROLE_STUDENT' ? (
        <HomeStudent />
      ) : (
        <HomeRepresentative />
      )}
    </div>
  )
}

export default withAuth(HomePage)
