import { React, useState, useEffect, Fragment } from "react";
import { Form, Table, Row, Col, FormGroup, Button, Label } from 'reactstrap';
import axios from "axios";
import { Input } from "reactstrap";

export default function Debito({ idCadastro, handleDebito }) {

    const [values, setValues] = useState({
        idCadastro: idCadastro,
        idMatricula: 1,
        descDebito: '',
        valorDebito: '',
        idTipDebito: 1,
        vctoDebito: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [valor, setValor] = useState(0);

    const postDebito = async () => {
        console.log(values);
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debito/', values
        );
        handleDebito();
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        if (valor > "") {
            valor = valor + '';
            valor = parseInt(valor.replace(/[\D]+/g, ''));
            valor = valor + '';
            valor = valor.replace(/([0-9]{2})$/g, ",$1");

            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
        }
        return valor;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.descDebito && values.valorDebito && values.vctoDebito) {
            setValid(true);
        }
        postDebito();
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {submitted && <div className="success-message">Débito gravado com sucesso!</div>}
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="idTipDebito">Tipo</Label>
                        <Input
                            id="idTipDebito"
                            name="idTipDebito"
                            type="select"
                            value={values.idTipDebito}
                            onChange={(e) => setValues((values) => ({
                                ...values,
                                idTipDebito: e.target.value,
                            }))}>
                            <option key={1} value={1}>MENSALIDADE</option>
                            <option key={2} value={2}>UNIFORME</option>
                            <option key={8} value={8}>CAMPORI</option>
                            <option key={9} value={9}>EVENTOS</option>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="descricaoDebito">Descrição</Label>
                        <Input
                            id="descricaoDebito"
                            name="descricaoDebito"
                            type="text"
                            value={values.descDebito}
                            onChange={(e) => setValues((values) => ({
                                ...values,
                                descDebito: e.target.value,
                            })
                            )}
                        />
                        {submitted && !values.descDebito && <span id="descricao-error">Descrição obrigatória</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="valorDebito">Valor</Label>
                        <Input
                            id="valorDebito"
                            name="valorDebito"
                            type="text"
                            value={values.valorDebito}
                            onChange={(e) => {                            
                             setValues((values) => ({
                                ...values,
                                valorDebito: formataMoeda(e.target.value),
                            }))
                            console.log(values.valorDebito)}
                            }
                        />
                        {submitted && !values.valorDebito && <span id="valor-error">Valor obrigatório</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="vencimentoDebito">Vencimento</Label>
                        <Input
                            id="vencimentoDebito"
                            name="vencimentoDebito"
                            type="date"
                            value={values.vctoDebito}
                            onChange={(e) => setValues((values) => ({
                                ...values,
                                vctoDebito: e.target.value,
                            }))}
                        />
                        {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>}
                    </FormGroup>
                </Row>
                <div>
                    <Button color="primary" type="submit">Registrar</Button>{' '}
                    <Button color="secondary" onClick={handleDebito}>Cancelar</Button>
                </div>
            </Form>
        </>
    );
}
