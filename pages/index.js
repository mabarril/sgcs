import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../pages/Main';
import { Container } from 'react-bootstrap'
import { Fragment } from 'react/cjs/react.production.min';

console.log("Home ...")

export default function Home() {
  return (
    <Fragment>
      <div className="text-center pt-2 web-class header-class">
        <h3>Sistema de Gerenciamento Cruzeiro do Sul</h3>
      </div>
      <div className="text-center pt-2 mobile-class header-class">
        <h3>SGCS</h3>
      </div>
      <Container>
        <Main />
      </Container>
    </Fragment>
  )
}