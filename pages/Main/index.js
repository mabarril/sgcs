import React from "react";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import ListaCadastro from "../../components/ListaCadastro";
import MenuPrincipal from "../../components/MenuPrincipal";

export default function Main() {
    return (
        <Fragment>
            <Row>
                <MenuPrincipal />   
            </Row>
            <Row>
                <ListaCadastro setIdCadastro></ListaCadastro>
            </Row>
        </Fragment>
    )
}
