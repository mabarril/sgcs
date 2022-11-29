
import { React, useState, useEffect } from "react";
import { Alert, Row, Col, Accordion, AccordionItem, AccordionHeader, AccordionBody, Button } from 'reactstrap';
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

    useEffect(() => {
        getDebito(desbravador.id);
    }, [desbravador]);


    return (
        <Row className="pt-5 pb-3">
            {debitos.length > 0 ?
                (<>
                    {debitos.map(debito => {
                        return (
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
                            </Accordion>
                        )
                    })}
                </>
                ) : (
                    <Row>
                        <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
                    </Row>
                )
            }
        </Row>)
}