import axios from "axios";
import { React, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function Cadastro({ handleClose }) {

    const [values, setValues] = useState({
        id: '',
        nome: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);
    const [valor, setValor] = useState(0);

    const postCadastro = async () => {
        console.log(values);
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/desbravador/', values
        );
        handleClose();
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.id && values.nome) {
            setValid(true);
        }
        postCadastro();
    };
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {submitted && <div className="success-message">Cadastro gravado com sucesso!</div>}
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="id">ID</Label>
                        <Input
                            id="id"
                            name="id"
                            type="text"
                            value={values.id}
                            onChange={(e) => setValues((values) => ({
                                ...values,
                                id: e.target.value,
                            }))}>
                        </Input>
                    </FormGroup>
                </Row>
                <Row>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input
                            id="nome"
                            name="nome"
                            type="text"
                            value={values.nome}
                            onChange={(e) => setValues((values) => ({
                                ...values,
                                nome: e.target.value,
                            })
                            )}
                        />
                        {submitted && !values.nome && <span id="descricao-error">Nome obrigatório</span>}
                    </FormGroup>
                </Row>
                <div>
                    <Button color="primary" type="submit">Registrar</Button>{' '}
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                </div>
            </Form>
        </>
    );
}
