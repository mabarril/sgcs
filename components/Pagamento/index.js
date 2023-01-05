import { React, useState, useEffect } from "react";
import { Table, Button, Form, Input, Row, FormGroup, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function Pagamento() {

    const [arrayDebitos, setArrayDebitos] = useState([]);
    const [valorPagamento, setValorPagamento] = useState(0);
    const [values, setValues] = useState({
        respPagamento: '',
        dtPagamento: '',
        valorPagamento: 0,
        tipoPagamento: 3
    });

    useEffect(() => {
        let valor = 0;
        arrayDebitos.forEach(item => {
            valor = valor + parseFloat(item.valordebito);
        });
        console.log(valor);
        setValorPagamento(valor);
    }, [arrayDebitos]);


    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div className="container small " style={{ backgroundColor: '#F5F5F5', }}>
                        <div className="row justify-content-lg-center" >
                            <h3 className="pt-3 pb-3 text-center"><strong>Registro de Pagamento</strong></h3>
                            <Table hover responsive size="sm">
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
                        </div>
                        <Form>
                            <Row>
                                <FormGroup>
                                    <Label for="respPagamento">Responsável</Label>
                                    <Input
                                        id="respPagamento"
                                        name="respPagamento"
                                        type="text"
                                        value={values.respPagamento}
                                        onChange={(e) => setValues((values) => ({
                                            ...values,
                                            respPagamento: e.target.value,
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
                            <Button color="primary" type="submit" style={{ float: 'right' }} onClick={(e) => postPagamento(e)}> <i className="bi bi-wallet2" /> Registrar Pagamento</Button>
                        </Form>
                    </div>
    )

}