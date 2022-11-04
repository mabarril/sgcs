import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Main from '../pages/Main';
import MenuPrincipal from '../components/MenuPrincipal';
import { Container } from 'react-bootstrap'
import { Fragment } from 'react/cjs/react.production.min';

console.log("Home ...")

export default function Home() {
  return (
    <>
      <Container>
        <Main />
      </Container>
    </>
  )
}