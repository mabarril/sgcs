
import { React, Fragment, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import Debitos from "../Debitos";
import axios from "axios";

export default function ListaCadastro() {

    const [user, setUser] = useState([]);
    const [idCadastro, setIdCadastro] = useState(0);
    const [param, setParam] = useState(0);

    useEffect(() => {
        axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/cadastros',
        )
            .then(async (response) => {
                setUser(await response.data);
            })
            .catch(function (error) {
            })
    }, []);

    function handleClick(e) {
        setParam(idCadastro);
        console.log('param ', param);
    }

    return (
        <Fragment>
            <Form>
                <FormGroup>
                    <Label for="exampleSelect">Desbravadores</Label>
                    <Input type="select" name="select" id="exampleSelect" onChange={e => setIdCadastro(e.target.value)}>
                        <option value="">Selecione</option>
                        {
                            user.map(
                                row => <option key={row.id} value={row.id}>{row.nome}</option>
                            )
                        }
                    </Input>

                </FormGroup>
            </Form>
            <Button onClick={(e) => handleClick(e)}>Debito</Button>
            <Row>
                <Debitos setIdCadastro={idCadastro}> </Debitos>
            </Row>
        </Fragment>
    )
}