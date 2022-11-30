
import { React, useState, useEffect } from "react";
import { Alert, Row, Card, CardBody, CardTitle, CardSubtitle, CardText, Col, Accordion, AccordionItem, AccordionHeader, AccordionBody, Button, ListGroup, ListGroupItem, Container } from 'reactstrap';
import axios from "axios";

export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [open, setOpen] = useState();

    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
    };

    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const formataTipo = (tipo) => {
        return tipo.substr(0, 1);
    }

    useEffect(() => {
        getDebito(desbravador.id);
    }, [desbravador]);


    return (
        <Row className="pt-5 pb-3">
            {debitos.length > 0 ?
                (<ListGroup flush>
                    {debitos.map(debito => {
                        return (
                            <ListGroupItem>
                                <Row>
                                    <Col style={{ float: "left" }}>
                                        <div className="circle" >
                                            <h2>{formataTipo(debito.desctipo)}</h2>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Row>
                                            {formataData(debito.vctodebito)}
                                        </Row>
                                        <Row className="descricao">
                                            {debito.descdebito}
                                        </Row>
                                    </Col>
                                    <Col className="valor">
                                        {formataMoeda(debito.valordebito)}
                                    </Col>
                                </Row>
                            </ListGroupItem>

                            /*<Card>
                               <CardBody>
                                    
                                    <CardTitle>Card title</CardTitle>
                                    <CardSubtitle>Card subtitle</CardSubtitle>
                                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                    <Button>Button</Button>
                                </CardBody>
                            </Card>
                             <Accordion open={open} toggle={toggle} key={debito.iddebito}>
                                <AccordionItem>
                                    <AccordionHeader targetId={debito.iddebito}>
                                        <div>
                                            <Row >
                                                <Col sm="6"> {debito.desctipo} </Col>
                                                <Col sm="3"> {formataData(debito.vctodebito)} </Col>
                                                <Col sm="3"> {formataMoeda(debito.valordebito)} </Col>
                                            </Row>
                                        </div>
                                    </AccordionHeader>
                                    <AccordionBody accordionId={debito.iddebito}>
                                   
                                   
                                        <Row style={{ paddingLeft: "3em" }}>
                                            <Col>{debito.descdebito}</Col>
                                            <Col>
                                                <div>
                                                    {debito.idpgto ? 'Pago' :
                                                        <Button color="success"
                                                            onClick={(e) => { handleSelectDebito(debito) }} ><i className="bi bi-cash-coin"></i></Button>}
                                                </div>
                                            </Col>
                                        </Row>

                                    </AccordionBody>
                                </AccordionItem>
                            </Accordion> */
                        )
                    })}
                </ListGroup>
                ) : (
                    <Row>
                        <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
                    </Row>
                )
            }
        </Row>)
}