import "bootstrap/dist/css/bootstrap.css";
import "/node_modules/primeflex/primeflex.css";
import "bootstrap-icons/font/bootstrap-icons.css"; import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Container, Row } from "reactstrap";
import ListaCadastro from "../components/ListaCadastro";
import MenuPrincipal from "../components/MenuPrincipal";

console.log("Home ...")

export default function Home() {
  return (
    <>
      <Container>
        <div className="text-center pt-2 web-class header-class">
          <h3>Sistema de Gerenciamento Cruzeiro do Sul</h3>
        </div>
        <div className="text-center pt-2 mobile-class header-class">
          <h3>SGCS</h3>
        </div>
        <MenuPrincipal />
      </Container>
    </>
  )
}