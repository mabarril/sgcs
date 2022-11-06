import React from "react";
import { Container, Row } from "reactstrap";
import ListaCadastro from "../../components/ListaCadastro";
import MenuPrincipal from "../../components/MenuPrincipal";

export default function Main() {
    return (
        <>
            <Container>
                <Row>
                    <MenuPrincipal />
                </Row>
                <Row>
                    <ListaCadastro setIdCadastro></ListaCadastro>
                </Row>
            </Container>
        </>
    )
}
