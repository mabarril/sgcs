
import { Fragment, React, useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, FormGroup, Input, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import Extrato from "../Extrato";
import Debito from "../Debito"

export default function ListaCadastro() {

    const [user, setUser] = useState([]);
    const [idCadastro, setIdCadastro] = useState(0);
    const [extrato, setExtrato] = useState(false);

    const [modal, setModal] = useState(false);

    const handleClose = () => {
        setModal(false);
        setExtrato(false);
        setExtrato(true);
    };

    const handleShow = () => setModal(true);

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
                <FormGroup>
                        <Input type="select" onChange={e => handleSelect(e.target.value)}>
                            <option value="">Selecione</option>
                            {
                                user.map(
                                    row => <option key={row.id} value={row.id}>{row.nome}</option>
                                )
                            }
                        </Input>
                </FormGroup>
                <FormGroup>
                        {extrato && idCadastro ? <Extrato idCadastro={idCadastro} handleShow={handleShow}/> : ''}
                </FormGroup>
            </Form>
            <Modal isOpen={modal}>
                <ModalHeader closeButton>
                    Débito
                </ModalHeader>
                <ModalBody><Debito idCadastro={idCadastro} handleClose={handleClose} /></ModalBody>
            </Modal>
        </>
    )
}