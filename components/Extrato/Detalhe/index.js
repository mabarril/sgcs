
import { React, useState, useEffect } from "react";
import { Alert, Row, Col, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { FormGroup, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from "axios";
import Debito from "../../Debito";

export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [open, setOpen] = useState('');
    const [modal, setModal] = useState(false);
    let resDebito = [];

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id)
        }
    };

    const getDebito = (idCadastro) => {
        try {
            axios.get('http://localhost:8080/debito/' + idCadastro).then((response) => setDebitos(response.data));
        }
        catch { (error) => console.error(error) };
    };

    const handleDebito = () => {
        setModal(!modal);
    };

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
        }
        return desctipo;
    }
    useEffect(() => {
        getDebito(desbravador.id);
    }, [desbravador, modal]);

    return (
        <div className="p-3">
            <Accordion open={open} toggle={toggle}>
                <AccordionItem>
                    <AccordionHeader targetId="1"><strong>Débitos</strong></AccordionHeader>
                    <AccordionBody accordionId="1">
                        <Row>
                            {debitos.length > 0 ? (
                                <ListGroup>
                                    {debitos.map((item) => (
                                        <ListGroupItem className="groupItem">
                                            <Row>
                                                <Col md="2" xs="2" >
                                                    <h2 className={formataTipo(item.idtipdebito).color} > {formataTipo(item.idtipdebito).tipo.substring(0, 1)}</h2>
                                                </Col>
                                                <Col md="8" xs="8">
                                                    <Row>
                                                        <Col>
                                                            <p className="descricao">{item.descdebito}</p>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>{formataData(item.vctodebito)}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md="2" xs="2">
                                                    <h4 className="valor" style={{ float: 'right' }}>{formataMoeda(item.valordebito)}</h4>
                                                    <FormGroup check style={{ float: 'right' }}>
                                                        <Input type="checkbox" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )
                                    )}
                                </ListGroup>
                            ) : <Alert color="warning">Não existe debito</Alert>}
                        </Row>
                        <Row className="p-3">
                            <div>
                                <Button color="primary" style={{ float: 'right' }} onClick={handleDebito}> <i className="bi bi-plus-circle"></i> Débito</Button>
                            </div>
                        </Row>
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">Teste</AccordionHeader>
                    <AccordionBody accordionId="2">Teste</AccordionBody>
                </AccordionItem>
            </Accordion>

            <Modal isOpen={modal}>
                <ModalHeader>
                    Débito
                </ModalHeader>
                <ModalBody><Debito idCadastro={desbravador.id} handleDebito={handleDebito} /></ModalBody>
            </Modal>

        </div>
    )
}