
import { React, useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, FormGroup, Input, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import Extrato from "../Extrato";
import Debito from "../Debito"

export default function ListaCadastro({ setDesbravador, setModal }) {

    const [user, setUser] = useState([]);
    const [dbv, setDbv] = useState();


    // const [modal, setModal] = useState(false);

    // const handleCloseDebito = () => {
    //     setModal(false);
    //     setExtrato(false);
    //     setExtrato(true);
    // };

    // const handleShowDebito = () => setModal(true);

    const handleSelect = (id) => {
        console.log(id);
        setDbv(user.find(item => item.id == id));
        console.log(dbv);
        setDesbravador(user.find(item => item.id == id));

    }

    useEffect(() => {
        // axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/cadastros',
        axios.get('http://localhost/dbv-api/desbravador',
        )
            .then(async (response) => {
                setUser(await response.data);
            })
            .catch(function (error) {
            });
    }, []);
    return (
        <>
            <Form>
                <FormGroup>
                    <Input type="select" onChange={e => handleSelect(e.target.value)}>
                        <option value="">Selecione</option>
                        {
                            user.map(
                                row => <option key={row.id} value={row.id}>{row.id} - {row.nome}</option>
                            )
                        }
                    </Input>
                </FormGroup>
                {/* <FormGroup>
                        {extrato && idCadastro ? <Extrato idCadastro={idCadastro} dbv={dbv} handleShowDebito={handleShowDebito}/> : ''}
                </FormGroup> */}
            </Form>

            {/* <Modal isOpen={modal}>
                <ModalHeader>
                    Débito
                </ModalHeader>
                <ModalBody><Debito idCadastro={idCadastro} handleCloseDebito={handleCloseDebito} /></ModalBody>
            </Modal> */}
        </>
    )
}