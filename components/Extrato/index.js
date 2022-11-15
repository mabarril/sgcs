import { React, useState, useEffect } from "react";
import { Table, Alert, Button, Form, Input, Row, FormGroup, Label, Col } from 'reactstrap';
import axios from "axios";


export default function Extrato({ idCadastro, dbv, handleShowDebito }) {

    const [debitos, setDebitos] = useState([]);
    const [arrayDebitos, setArrayDebitos] = useState([]);
    const [valorPagamento, setValorPagamento] = useState(0);

    const [values, setValues] = useState({
        respcredito: '',
        dtcredito: '',
        valorcredito: 0,
        tipocredito: 0
    });

    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
    };

    const postCredito = () => {
        setValues({...values,
            valorcredito : valorPagamento });
        console.log(values);
        axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/creditos/', values
        );
    }

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

    const handleSubmit = (e) => {

        console.log('oiiiiii');
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
                            <div className="col-8 p-3 " style={{backgroundColor : '#F5F5F5', }}>
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
                                                        {/* <td>{debito.idpgto ? 'Pago' :
                                <Button
                                    onClick={(e) => { handleSelectDebito(debito) }} ><i class="bi bi-cash-coin"></i></Button>}
                            </td> */}
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                    <tfoot>
                                        <p>{formataMoeda(valorPagamento)}</p>
                                    </tfoot>
                                </Table>
                                <Form onSubmit={handleSubmit}> 
                                    <Row>
                                        <FormGroup>
                                            <Label for="respcredito">Responsável</Label>
                                            <Input
                                                id="respcredito"
                                                name="respcredito"
                                                type="text"
                                                value={values.respcredito}
                                                onChange={(e) => setValues((values) => ({
                                                    ...values,
                                                    respcredito: e.target.value,
                                                }))}
                                            />
                                            {/* {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>} */}
                                        </FormGroup>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Label for="dtcredito">Data do Pagamento</Label>
                                                <Input
                                                    id="dtcredito"
                                                    name="dtcredito"
                                                    type="date"
                                                    value={values.dtcredito}
                                                    onChange={(e) => setValues((values) => ({
                                                        ...values,
                                                        dtcredito: e.target.value,
                                                    }))}
                                                />
                                                {/* {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>} */}
                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <FormGroup>
                                                <Label for="tipocredito">Tipo</Label>
                                                <Input
                                                    id="tipocredito"
                                                    name="tipocredito"
                                                    type="select"
                                                    value={values.tipocredito}
                                                    onChange={(e) => setValues((values) => ({
                                                        ...values,
                                                        tipocredito: e.target.value,
                                                    }))}>
                                                    <option key={3} value={3}>CRÉDITO</option>
                                                    <option key={4} value={4}>DÉBITO</option>
                                                    <option key={5} value={5}>PIX</option>
                                                    <option key={6} value={6}>TRANSFERÊNCIA</option>
                                                    <option key={7} value={7}>DINHEIRO</option>
                                                </Input>
                                                {/* {submitted && !values.vctoDebito && <span id="vcto-error">Vencimento obrigatório</span>} */}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="primary" type="submit">Registrar</Button>{' '}
                                    <Button color="primary" type="submit" style={{ float: 'right' }} > <i className="bi bi-wallet2"/> Salvar</Button>
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
