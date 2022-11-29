import { React, useState, useEffect } from "react";
import { Table, Button, Form, Input, Row, FormGroup, Label, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import ListaCadastro from "../ListaCadastro";
import Detalhe from "./Detalhe";

export default function Extrato({ idCadastro, dbv, handleShowDebito }) {

    const [arrayDebitos, setArrayDebitos] = useState([]);
    const [valorPagamento, setValorPagamento] = useState(0);
    const [modal, setModal] = useState(false);
    const [desbravador, setDesbravador] = useState([]);

    const [values, setValues] = useState({
        respPagamento: '',
        dtPagamento: '',
        valorPagamento: 0,
        tipoPagamento: 3
    });

    const postPagamento = async (e) => {
        e.preventDefault();
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

    // const handleSelectDebito = (debito) => {
    //     debito = { ...debito, "nome": dbv.nome };
    //     if (arrayDebitos.filter(item => item.iddebito === debito.iddebito).length === 0) {
    //         setArrayDebitos(debitos => [...debitos, debito])
    //     }
    // };

    // const handleRemoveItemPagamento = (debito) => {
    //     let arrayRemovido = (arrayDebitos.filter(item => item.iddebito != debito.iddebito))
    //     console.log(arrayRemovido);
    //     setArrayDebitos(arrayRemovido)
    // }

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

            <Row className="pt-5 pb-3">
                {
                    desbravador.id != null ? (
                        <>
                        <Row>
                            <Col>
                                <h3><strong>{desbravador.nome}</strong></h3>
                            </Col>
                            <Col>
                                <Button color="primary" onClick={handleShowDebito} style={{ float: 'right' }} > <i className="bi bi-plus-circle"></i> Débito</Button>
                            </Col>
                        </Row>
                        <Detalhe desbravador={desbravador}></Detalhe>
                    </>
                    ) : null
                }
            </Row>



            <Row>
                
                <div>
                    <Button color="primary" style={{ float: 'right' }} onClick={() => setModal(true)}> <i className="bi bi-search"></i>  Desbravador </Button> {"  "}
                </div>
            </Row>
            <Row>
                <div>

                </div>
            </Row>

            {
                arrayDebitos.length > 0 ? (
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
                    : null
            }

            <Modal isOpen={modal}>
                <ModalHeader>
                    Selecione o Desbravador
                </ModalHeader>
                <ModalBody>
                    <ListaCadastro setDesbravador={setDesbravador} setModal={setModal} />
                </ModalBody>
                <ModalFooter><Button color="danger" onClick={() => { setModal(false) }}>Cancelar</Button></ModalFooter>
                {/* <ModalBody><Debito idCadastro={idCadastro} handleCloseDebito={handleCloseDebito} /></ModalBody> */}
            </Modal>
        </>
    );

}
