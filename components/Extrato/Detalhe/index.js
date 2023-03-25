import { React, useEffect, useRef, useState, createRef } from "react";
import axios from "axios";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataView } from 'primereact/dataview';
import { Message } from 'primereact/message';
import { ToggleButton } from 'primereact/togglebutton';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, Table } from 'reactstrap';
import logo from "../../../public/logo_clube.jpg";
import Debito from "../../Debito";
import Recibo from "../../Recibo";


export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [modal, setModal] = useState(false);
    const [debitosSelecionados, setDebitosSelecionados] = useState([]);
    const [arrayDebitos, setArrayDebitos] = useState([]);
    const [valorPagamento, setValorPagamento] = useState(0);
    const toast = useRef(null);
    const [img, setImg] = useState();
    const [values, setValues] = useState({
        respPagamento: '',
        dtPagamento: '',
        valorPagamento: 0,
        tipoPagamento: 3
    });

    let resDebito = [];

const postPagamento = async (e) => {
    e.preventDefault();
    let debitos = debitosSelecionados.map(item => item.id);

    await axios.post('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/pagamento/',
        //await axios.post('http://localhost/dbv-api/pagamento/',
        {
            ...values,
            valorPagamento: valorPagamento,
            debitos: debitos,
        })
        .then((response) => {
            console.log(response);
            handlePagamento();
        })
        .catch((error) => console.error(error));
};


const getDebito = (idCadastro) => {
    try {

        axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debito/'
            //axios.get('http://localhost/dbv-api/debito/' 
            + idCadastro).then((response) => setDebitos(response.data));
    }
    catch { (error) => console.error(error) };
};

const handleDebito = () => {
    setModal(!modal);
};

const handlePagamento = () => {
    setValues([]);
    setDebitosSelecionados([]);
    getDebito(desbravador.id);
    Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
    );
};

useEffect(() => {
    let valor = 0;
    debitosSelecionados.forEach(item => {
        valor = valor + parseFloat(item.valordebito);
    });
    console.log(valor);
    setValorPagamento(valor);
}, [debitosSelecionados]);

const formataData = (param) => {
    var data = new Date(param)
    return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
}

const formataMoeda = (valor) => {
    valor = parseFloat(valor);
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

const formataTipo = (tipo) => {
    let desctipo = [];
    switch (tipo) {
        case 1:
            desctipo = { tipo: "MENSALIDADE", color: "circle mensalidade" };
            break;
        case 2:
            desctipo = { tipo: "UNIFORME", color: "circle uniforme" };
            break;
        case 8:
            desctipo = { tipo: "CAMPORI", color: "circle campori" };
            break;
        case 9:
            desctipo = { tipo: "EVENTOS", color: "circle evento" };
            break;
        case 10:
            desctipo = { tipo: "INSCRIÇÃO", color: "circle evento" };
            break;
    }
    return desctipo;
}

const handleDebitoSelecionado = (item, desbravador) => {
    let _debitosSelecionados = [...debitosSelecionados];

    item = ({
        ...item,
        nome: desbravador.nome,
    });

    if (_debitosSelecionados.some((itemPagar) => item.id === itemPagar.id))
        _debitosSelecionados = _debitosSelecionados.filter(itemPagar => itemPagar.id !== item.id)
    else
        _debitosSelecionados.push(item);

    setDebitosSelecionados(_debitosSelecionados);
    console.log(debitosSelecionados);
}

const handleRemoveItemPagamento = (debito) => {
    let _debitosSelecionados = [...debitosSelecionados];
    if (_debitosSelecionados.some((itemPagar) => debito.id === itemPagar.id)) {
        _debitosSelecionados = _debitosSelecionados.filter(itemPagar => itemPagar.id !== debito.id)
        setDebitosSelecionados(_debitosSelecionados)
    }
}

const formataBgPagamento = (item) => {
    if (item.idpgto) return "flex flex-column align-items-center p-1 w-full md:flex-row bg-light"
    return "flex flex-column align-items-center p-1 w-full md:flex-row"
}

useEffect(() => {
    getDebito(desbravador.id);
}, [desbravador, modal]);



const renderListItem = (item) => {
    console.log(item);
    return (
        <div className="col-12">
            <div className={formataBgPagamento(item)} key={item.id}>
                {/* <div className="md:w-3rem  md:my-0 md:mr-5 mr-0 my-5">
                        <h2 className={formataTipo(item.idtipdebito).color}> {item.desctipo.substring(0,1)}</h2>
                    </div> */}
                <div className="text-center md:text-left md:flex-1">
                    <div className="text-2xl font-bold">{item.descdebito}</div>
                    <div className="mb-1">{formataData(item.vctodebito)}</div>
                </div>
                <div className="flex md:flex-column mt-1 justify-content-between align-items-center md:w-auto w-full">
                    <span className="align-self-center text-2xl font-semibold mb-2 md:align-self-end">{formataMoeda(item.valordebito)}</span>
                    {item.idpgto ? <p>pago</p> : <ToggleButton
                        name="pagar"
                        value={item}
                        id={item.id}
                        checked={debitosSelecionados.some((itemPagar) => item.id === itemPagar.id)}
                        onChange={(e) => handleDebitoSelecionado(item, desbravador)}
                        onLabel=" Selecionado"
                        offLabel=" Pagar"
                        offIcon="pi pi-check"
                        onIcon="pi pi-times"
                    />}
                </div>
            </div>
        </div>
    );
};

const itemTemplate = (debitos) => {
    return renderListItem(debitos)
};

return (
    <div className="p-3">
        <Row>
            <a href="http://iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/recibo/index.php" target={"_blank"}>Recibo</a>

            <Col md="6" sm="12">
                <Accordion activeIndex={0}>
                    <AccordionTab header="Extrato">
                        <div>
                            <div className="card">
                                {debitos.length > 0 ? (<DataView value={debitos} itemTemplate={itemTemplate} />) : <Message severity="warn" text="Não existem débitos" />}
                            </div>
                            <div className="m-3 grid justify-content-end">
                                <Button color="primary" onClick={handleDebito}> <i className="bi bi-plus-circle"></i> Débito</Button>
                            </div>
                        </div>
                    </AccordionTab>
                    <AccordionTab header="Pagamentos">
                        <p>Tab 2</p>
                    </AccordionTab>
                </Accordion>
                <Modal isOpen={modal}>
                    <ModalHeader>
                        Débito
                    </ModalHeader>
                    <ModalBody><Debito idCadastro={desbravador.id} handleDebito={handleDebito} /></ModalBody>
                </Modal>
            </Col>
            <Col md="6" sm="12" >
                <div className="container small pb-7 " style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }} size="auto">
                    <div className="row justify-content-lg-center">
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
                                    debitosSelecionados.map(debito => {
                                        return (

                                            <tr key={debito.id}>
                                                <td>{debito.nome.split(" ", 1)}</td>
                                                <td>{debito.descdebito}</td>
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
            </Col>

            <div>
                        {/* <Recibo /> */}
            </div>

        </Row>
    </div>
)
}