
import { React, useState, useEffect } from "react";
import { Alert, Row, Col, ListGroup, ListGroupItem, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import axios from "axios";

export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [circuloColorido, setCiruloColorido] = useState('');
    const [open, setOpen] = useState('');
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

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const formataTipo = (tipo) => {
        let desctipo = '';
        switch (tipo) {
            case 1:
                desctipo = "MENSALIDADE";
                setCiruloColorido("circle ");
                break;
            case 2:
                desctipo = "UNIFORME";
                console.log("UNIFORME")
                break;
            case 8:
                desctipo = "CAMPORI";
                console.log("CAMPORI");
                break;
            case 9:
                desctipo = "EVENTOS";
                console.log("EVENTOS");
                break;
        }
        return desctipo.substr(0, 1);
    }
    useEffect(() => {
        getDebito(desbravador.id);
    }, [desbravador]);

    return (
        <div className="p-3">
            <Accordion open={open} toggle={toggle}>

                <AccordionItem>
                    <AccordionHeader targetId="1">Débitos</AccordionHeader>
                    <AccordionBody accordionId="1">
                        {debitos.length > 0 ? (
                            <ListGroup>
                                {debitos.map((item) => (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>{item.idtipdebito}</Col>
                                            <Col>
                                                {formataData(item.vctodebito)}
                                            </Col>
                                            <Col>
                                                {formataMoeda(item.valordebito)}
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )
                                )}
                            </ListGroup>
                        ) : <Alert color="warning">Não existe debito</Alert>}
                    </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                    <AccordionHeader targetId="2">Teste</AccordionHeader>
                    <AccordionBody accordionId="2">Teste</AccordionBody>
                </AccordionItem>
            </Accordion>

        </div>
    )
}