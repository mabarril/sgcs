import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import "primeicons/primeicons.css"; //icons
import "primereact/resources/primereact.min.css"; //core css
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import React from "react";
import { Container } from "reactstrap";
import MenuPrincipal from "../components/MenuPrincipal";
import "/node_modules/primeflex/primeflex.css";

console.log("Home ...")

export default function Home() {
  return (
    <Container>
      <MenuPrincipal />
    </Container>
  )
}