
import { React, Fragment, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button, Row } from 'reactstrap';
import Debitos from "../Debitos";
import axios from "axios";

export default function ListaCadastro() {

    const [user, setUser] = useState([]);
    const [idCadastro, setIdCadastro] = useState(0);
    const [debitos, setDebitos] = useState([]);

    useEffect(() => {
        axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/cadastros',
        )
            .then(async (response) => {
                setUser(await response.data);
            })
            .catch(function (error) {
            })
    }, []);

    function getDebito() {
        if (idCadastro) {

            axios.get('http://localhost/dbv-api/debitos/' + idCadastro)
                .then(async (response) => {
                    setDebitos(await response.data)
                })
                .catch((error) => { })
                ;
        }
    };

    function handleClick() {
        getDebito();
        console.log('debitos ', debitos);
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
            <Button onClick={handleClick}>Débitos</Button>
            <Row>
                <span>Debito</span>
                <table>
                    {/* <thead>
                        <th>Descricao</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                    </thead> */}
                    <tbody>
                        {debitos.map(debito => {
                            <tr>
                                <td key={debito.iddebito}>debito.descdebito</td>
                                <td key={debito.iddebito}>debito.valordebito</td>
                                <td key={debito.iddebito}>debito.vctodebito</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </Row>
        </Fragment>
    )
}