
import { Fragment, React, useEffect, useState } from "react";
import Debitos from "../Debitos";
import axios from "axios";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";

export default function ListaCadastro() {

    const [user, setUser] = useState([]);
    const [idCadastro, setIdCadastro] = useState(0);
    const [incluirDebito, setIncluirDebito] = useState(false);
    const [extrato, setExtrato] = useState(false);

    const handleSelect = (id) => {
        setIdCadastro(id);
        setIncluirDebito(false);
        setExtrato(false);
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
        <Fragment>
            <Form>
                <h3 className="pt-3 pb-3">Desbravadores</h3>
                <Form.Select onChange={e => handleSelect(e.target.value)}>
                    <option value="">Selecione</option>
                    {
                        user.map(
                            row => <option key={row.id} value={row.id}>{row.nome}</option>
                        )
                    }
                </Form.Select>
                <Row className="m-3">
                    {extrato && idCadastro ? <Debitos idCadastro={idCadastro} /> : ''}
                </Row>
                <div>
                    <Button className="m-1" variant="primary" size="large" onClick={(e) => { setExtrato(!extrato); setIncluirDebito(!incluirDebito) }}>Extrato</Button>
                    <Button className="m-1" variant="primary" size="large" onClick={(e) => { setIncluirDebito(!incluirDebito); setExtrato(!extrato) }}>Débito</Button>
                </div>
            </Form>
        </Fragment>
    )
}