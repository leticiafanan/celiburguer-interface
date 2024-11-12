import PropTypes from 'prop-types'
import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { Header } from '../components/Header'

function PrivateRoute({ component, isAdmin, ...rest }) {
  const user = localStorage.getItem('codeburguer:userData')

  if (!user) {
    return <Redirect to="/login" />
  }

  if (isAdmin && !JSON.parse(user).admin) {
    return <Redirect to="/login" />
  }
  return (
    <>
      {!isAdmin && <Header />} {/* se isAdmin for falso mostrar Header */}
      <Route {...rest} component={component} />
    </>
  )
}
export default PrivateRoute

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}