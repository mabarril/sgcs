import { React, useState, useEffect } from "react";
import { Table, Alert, Button, Form, Input, Row, FormGroup, Label, Col } from 'reactstrap';
import axios from "axios";


export default function Extrato({ idCadastro, dbv, handleShowDebito }) {

    const [debitos, setDebitos] = useState([]);
    const [arrayDebitos, setArrayDebitos] = useState([]);
    const [valorPagamento, setValorPagamento] = useState(0);

    const [values, setValues] = useState({
        respPagamento: '',
        dtPagamento: '',
        valorPagamento: 0,
        tipoPagamento: 3
    });

    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
    };

    const postPagamento = async () => {
        setValues({
            ...values,
            valorPagamento: valorPagamento,
            debitos: arrayDebitos
        });
        await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/pagamento/', values)
            .then((response) => {
                console.log(response);
                handlePagamento(response.data.ID, arrayDebitos);
            })
            .catch((error) => console.error(error));
    };


    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const handleSelectDebito = (debito) => {
        debito = { ...debito, "nome": dbv.nome };
        if (arrayDebitos.filter(item => item.iddebito === debito.iddebito).length === 0) {
            setArrayDebitos(debitos => [...debitos, debito])
        }
    };

    const handleRemoveItemPagamento = (debito) => {
        let arrayRemovido = (arrayDebitos.filter(item => item.iddebito != debito.iddebito))
        console.log(arrayRemovido);
        setArrayDebitos(arrayRemovido)
    }

    const handleCredito = (e) => {
        e.preventDefault();
        postCredito();
    };

    useEffect(() => {
        getDebito(idCadastro);
    }, [idCadastro]);

    useEffect(() => {
        let valor = 0;
        arrayDebitos.forEach(item => {
            valor = valor + parseFloat(item.valordebito);
        });
        console.log(valor);
        setValorPagamento(valor);
    }, [arrayDebitos]);

    return (
        <>
            {debitos.length > 0 ? (<>
                <Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                                <th>Vencimento</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {debitos.map(debito => {
                                return (
                                    <tr key={debito.iddebito}>
                                        <td>{debito.desctipo}</td>
                                        <td>{debito.descdebito}</td>
                                        <td>{formataMoeda(debito.valordebito)}</td>
                                        <td>{formataData(debito.vctodebito)}</td>
                                        <td>{debito.idpgto ? 'Pago' :
                                            <Button color="success"
                                                onClick={(e) => { handleSelectDebito(debito) }} ><i className="bi bi-cash-coin"></i></Button>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Row>
            </>
            ) : (<>
                <Row>
                    <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
                </Row>
            </>)}
            <Row p>
                <div>
                    <Button color="primary" onClick={handleShowDebito} style={{ float: 'right' }} > <i className="bi bi-plus-circle"></i> Débito</Button>{" "}
                </div>
            </Row>

            {
                arrayDebitos.length > 0 ? (
                    <div className="container text-center" >
                        <div className="row justify-content-lg-center" >
                            <div className="col-8 p-3 " style={{ backgroundColor: '#F5F5F5', }}>
                                <h3 className="pt-3 pb-3"><strong>Registro de Pagamento</strong></h3>
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th>Tipo</th>
                                            <th>Valor</th>
                                            <th>Vencimento</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            arrayDebitos.map(debito => {
                                                return (

                                                    <tr key={debito.iddebito}>
                                                        <td>{debito.nome.split(" ", 1)}</td>
                                                        <td>{debito.desctipo}</td>
                                                        <td>{formataMoeda(debito.valordebito)}</td>
                                                        <td>{formataData(debito.vctodebito)}</td>
                                                        <td>
                                                            <Button color="danger" onClick={(e) => { handleRemoveItemPagamento(debito) }}><i className="bi bi-trash" /></Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                    <tfoot>
                                        <p>{formataMoeda(valorPagamento)}</p>
                                    </tfoot>
                                </Table>
                                <Form>
                                    <Row>
                                        <FormGroup>
                                            <Label for="respcredito">Responsável</Label>
                                            <Input
                                                id="respcredito"
                                                name="respcredito"
                                                type="text"
                                                value={values.respCredito}
                                                onChange={(e) => setValues((values) => ({
                                                    ...values,
                                                    respCredito: e.target.value,
                                                }))}
                                            />
                                            {/* {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>} */}
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="dtPagamento">Data do Pagamento</Label>
                                                <Input
                                                    id="dtPagamento"
                                                    name="dtPagamento"
                                                    type="date"
                                                    value={values.dtPagamento}
                                                    onChange={(e) => setValues((values) => ({
                                                        ...values,
                                                        dtPagamento: e.target.value,
                                                    }))}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="tipoPagamento">Tipo</Label>
                                                <Input
                                                    id="tipoPagamento"
                                                    name="tipoPagamento"
                                                    type="select"
                                                    value={values.tipoPagamento}
                                                    onChange={(e) => setValues((values) => ({
                                                        ...values,
                                                        tipoPagamento: e.target.value,
                                                    }))}>
                                                    <option key={3} value={3}>CRÉDITO</option>
                                                    <option key={4} value={4}>DÉBITO</option>
                                                    <option key={5} value={5}>PIX</option>
                                                    <option key={6} value={6}>TRANSFERÊNCIA</option>
                                                    <option key={7} value={7}>DINHEIRO</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit" style={{ float: 'right' }} onClick={(e) => handlePagamento(e)}> <i className="bi bi-wallet2" /> Registrar Pagamento</Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                )
                    : null
            }
        </>
    );

}
