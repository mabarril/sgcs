
import { Fragment, React, useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "react-bootstrap";
import Extrato from "../Extrato";
import Debito from "../Debito"

export default function ListaCadastro() {

    const [user, setUser] = useState([]);
    const [idCadastro, setIdCadastro] = useState(0);
    const [extrato, setExtrato] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setExtrato(false);
        setExtrato(true);
    };
    const handleShow = () => setShow(true);

    const handleSelect = (id) => {
        setIdCadastro(id);
        setExtrato(true);
    }

    useEffect(() => {
        axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/cadastros',
        )
            .then(async (response) => {
                setUser(await response.data);
            })
            .catch(function (error) {
            })
    }, []);
    return (
        <>
            <Form>
                <Row>
                    <h3 className="pt-3 pb-3">Desbravadores</h3>
                </Row>
                <Row>
                    <Form.Select onChange={e => handleSelect(e.target.value)}>
                        <option value="">Selecione</option>
                        {
                            user.map(
                                row => <option key={row.id} value={row.id}>{row.nome}</option>
                            )
                        }
                    </Form.Select>
                </Row>
                <Row>
                    {extrato && idCadastro ? <Extrato idCadastro={idCadastro} /> : ''}
                </Row>
                <Row>
                    <Button className="m-1" variant="primary" size="large" onClick={handleShow}>Débito</Button> 
                </Row>
                {/* <Row className="m-3">
                    {incluirDebito ? <Debito /> : ''}
                </Row> */}
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body><Debito idCadastro={idCadastro} handleClose={handleClose} /></Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}