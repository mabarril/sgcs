import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import ListaCadastro from "../ListaCadastro";
import { Form, Button, FormGroup, Input, Row, Modal, ModalHeader, ModalBody, Label } from "reactstrap";
import { Toast } from 'primereact/toast';

export default function Inscricao(idCadastro) {

    const [desbravador, setDesbravador] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState({
        idDesbravador: 0,
        ano: new Date().getFullYear(),
        desconto: 0,
        justificativa: '',
        valorMensalidade: 0,
        qtdMensalidade: 0,
    });
    const toast = useRef(null);
    const [mensagemErro, setMensagemErro] = useState(null);

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Successo', detail: 'Matrícula realizada', life: 3000 });
    }

    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Erro ', detail: 'Matricula não realizada', life: 3000 });
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
        postInscricao();
    };

    const postInscricao = async () => {

        // await axios.post('http://localhost/dbv-api/inscricao/', values)
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/inscricao/', values)
            .then((response) => {
                showSuccess();
            })
            .catch((error) => {
                showError()
            });

    }

    useEffect(() => {
        setValues((values) => ({
            ...values,
            idDesbravador: desbravador.id,
        }))
    }, [desbravador]);

    return (
        <>
            <Row className="p-3">
                <ListaCadastro setDesbravador={setDesbravador} />
            </Row>
            <Toast ref={toast} />
            <Row className="p-3">
                {
                    desbravador.id != null ? (
                        <>
                            <Row>
                                <h3><strong>{desbravador.nome}</strong></h3>
                            </Row>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    {submitted && <div className="success-message">Inscricao efetuada com sucesso!</div>}
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="ano">Ano</Label>
                                        <Input
                                            id="ano"
                                            name="ano"
                                            type="text"
                                            value={values.ano}
                                            onChange={(e) => setValues((values) => ({
                                                ...values,
                                                ano: e.target.value,
                                            }))}>
                                        </Input>
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="desconto">Desconto</Label>
                                        <Input
                                            id="desconto"
                                            name="desconto"
                                            type="number"
                                            min="0"
                                            max="1"
                                            step="0.05"
                                            value={values.desconto}
                                            onChange={(e) => setValues((values) => ({
                                                ...values,
                                                desconto: parseFloat(e.target.value).toFixed(2),
                                            })
                                            )}
                                        />
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="justificativa">Justificativa</Label>
                                        <Input
                                            id="justificativa"
                                            name="justificativa"
                                            type="text"
                                            value={values.justificativa}
                                            onChange={(e) => {
                                                setValues((values) => ({
                                                    ...values,
                                                    justificativa: e.target.value,
                                                }))
                                            }}
                                        />
                                        {submitted && (!values.justificativa && values.desconto > 0) && <span id="desconto-error">Justificativa obrigatória</span>}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="valorMensalidade">Valor da Mensalidade</Label>
                                        <Input
                                            id="valorMensalidade"
                                            name="valorMensalidade"
                                            type="text"
                                            value={values.valorMensalidade}
                                            onChange={(e) => setValues((values) => ({
                                                ...values,
                                                valorMensalidade: formataMoeda(e.target.value),
                                            }))}
                                        />
                                        {submitted && !values.valorMensalidade && <span id="valor-error">Valor obrigatório</span>}
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="qtdMensalidade">Quantidade de Mensalidades</Label>
                                        <Input
                                            id="qtdMensalidade"
                                            name="qtdMensalidade"
                                            type="number"
                                            min="0"
                                            max="12"
                                            value={values.qtdMensalidade}
                                            onChange={(e) => setValues((values) => ({
                                                ...values,
                                                qtdMensalidade: e.target.value,
                                            })
                                            )}
                                        />
                                        {submitted && values.qtdMensalidade > 0 && <span id="qtd-error">Quantidade obrigatória</span>}
                                    </FormGroup>
                                </Row>
                                <div>
                                    <Button color="primary" type="submit">Registrar</Button>{' '}
                                    <Button color="secondary">Cancelar</Button>
                                </div>
                            </Form>
                        </>
                    ) : null
                }
            </Row>
        </>
    )
}