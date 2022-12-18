
import { React, useState, useEffect } from "react";
import { Alert, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import axios from "axios";

export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [circuloColorido, setCiruloColorido] = useState('');
    const [exibeDebitos, setExibeDebitos] = useState(false);

    const getDebito = async (idCadastro) => {
        const res = await axios.get('http://localhost:8080/debito/' + idCadastro)
            .then((response) => response.data)
            .catch((error) => console.error(error));

        carregaDebito(res);
    };

    const carregaDebito = (res) => {
        const itensArray = [];
        console.log(e)
        res.forEach(element => {
            itensArray.push(element);
        });

        const setDebitos = () => setDebitos(itensArray);
    }

    //     if (debitos.length > 0) {
    //         setExibeDebitos(true);
    //     }
    // }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    const verificaCor = (tipo) => {

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
        console.log(debitos);
    }, [desbravador]);


    return (
        <Row className="pt-5 pb-3">
            {debitos.length > 0 ?
                (<ListGroup flush>
                    {debitos.map(debito => {
                        return (
                            <ListGroupItem key={debito.iddebito}>
                                <Row>
                                    <Col style={{ float: "left" }}>
                                        <div className={circuloColorido} >
                                            <h2>{formataTipo(debito.idtipdebito)}</h2>
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
                    <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
                )
            }
        </Row>)
}