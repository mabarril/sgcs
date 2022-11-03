import React from "react";
import { Fragment } from "react";
import { Row } from "react-bootstrap";
import ListaCadastro from "../../components/ListaCadastro";


export default function Main() {
    return (
        <Fragment>
            <Row>
                <ListaCadastro setIdCadastro></ListaCadastro>
            </Row>
        </Fragment>
    )
}
