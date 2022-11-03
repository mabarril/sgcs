import { React, useState, useEffect, Fragment } from "react";
import { Form, Table, Row, Col, FormGroup, Button, Label } from 'react-bootstrap';
import axios from "axios";
import { Input } from "reactstrap";

export default function Debito({ idCadastro }) {

    const [debito, setDebito] = useState([]);

    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
        console.log('debito ', debito);
    };

    const postDebito = async (idCadastro) => {
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/')
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        console.log(idCadastro);
        getDebito(idCadastro);
    }, [idCadastro]);

    return (
        <Fragment>
            <Form>
                <Row>
                    <FormGroup>
                        <label>Descrição do Débito</label>
                        <Input
                            id="descricaoDebito"
                            name="descricaoDebito"
                            type="text"
                        />
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <label>Valor</label>
                        <Input
                            id="valorDebito"
                            name="valorDebito"
                            type="text"
                        />
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <label>Vencimento</label>
                        <Input
                            id="vencimentoDebito"
                            name="vencimentoDebito"
                            type="text"
                        />
                    </FormGroup>
                </Row>
                <Row>
                    <Button>
                        Sign in
                    </Button>
                </Row>
            </Form>
        </Fragment>
    );
}
