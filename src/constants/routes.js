/**
 * Created by chalosalvador on 17/01/2019.
 */

const publicRoutes = {
  INDEX: '/',
  LOGIN: '/ingreso',
  REGISTER: '/registro',
  HOME: '/inicio',
  ABOUT: '/acerca-de',
  PROFILE: '/Profile',
  RECOVERPASSWORD: '/RecoverPassword',

}

const adminRoutes = [
  {
    url: '/facultades',
    label: 'FACULTADES',
  },
  {
    url: '/Carreras',
    label: 'CARRERAS',
  },
  {
    url: '/Materias',
    label: 'MATERIAS',
  },
  {
    url: '/Estudiantes',
    label: 'ESTUDIANTES',
  },
  {
    url: '/Profesores',
    label: 'PROFESORES',
  },
  {
    url: '/Administrativos',
    label: 'ADMINISTRATIVOS',
  },
  {
    url: '/inicio',
    label: 'PRACTICAS',
  },
]

const privateRoutes = {
  LOGOUT: '/logout',
  USERS: '/usuarios',
  INTERNSHIP_ID: '/practica/:id',
  CHANGEPASSWORD: '/ChangePassword',
  REPORT_ID: '/report/:id',
  adminRoutes,
}

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
  ...adminRoutes,
}
export default Routes
