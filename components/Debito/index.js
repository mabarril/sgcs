import { React, useState, useEffect, Fragment } from "react";
import { Form, Table, Row, Col, FormGroup, Button, Label } from 'react-bootstrap';
import axios from "axios";
import { Input } from "reactstrap";

export default function Debito({ idCadastro }) {

    const [values, setValues] = useState({
        idCadastro: idCadastro,
        idMatricula: 1,
        descDebito: '',
        valorDebito: 0,
        idTipDebito: 1,
        vctoDebito:''
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);


    // const getDebito = async (idCadastro) => {
    //     await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
    //         .then((response) => setDebitos(response.data))
    //         .catch((error) => console.error(error));
    //     console.log('debito ', debito);
    // };  

    const postDebito = async () => {
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/', values)
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.descDebito && values.valorDebito && values.vctoDebito) {
            setValid(true);
        }
        postDebito();
        setSubmitted(true);
    };

    useEffect(() => {
        console.log(idCadastro);
        // getDebito(idCadastro);
    }, [idCadastro]);

    return (
        <Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {submitted && <div className="success-message">Débito gravado com sucesso!</div>}
                </Row>
                <Row>
                    <FormGroup>
                        <label>Descrição do Débito</label>
                        <Input
                            id="descricaoDebito"
                            name="descricaoDebito"
                            type="text"
                            value={values.descDebito}
                            onChange={(e) => setValues((values)=>({
                                ...values,
                                descDebito: e.target.value,
                            })
                            )}
                        />
                        { submitted && !values.descDebito &&  <span id="descricao-error">Descrição obrigatória</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <label>Valor</label>
                        <Input
                            id="valorDebito"
                            name="valorDebito"
                            type="text"
                            value={values.valorDebito}
                            onChange={(e) => setValues((values)=>({
                                ...values,
                                valorDebito: e.target.value,
                            }))}
                        />
                        {submitted && !values.valorDebito && <span id="valor-error">Valor obrigatório</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <label>Vencimento</label>
                        <Input
                            id="vencimentoDebito"
                            name="vencimentoDebito"
                            type="date"
                            value={values.vctoDebito}
                            onChange={(e) => setValues((values)=>({
                                ...values,
                                vctoDebito: e.target.value,
                            }))}
                        />
                        {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>}
                    </FormGroup>
                </Row>
                <Row>
                    <Button type="submit">
                        Registrar
                    </Button>
                </Row>
            </Form>
        </Fragment>
    );
}
