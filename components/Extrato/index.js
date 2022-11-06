import { React, useState, useEffect, Fragment } from "react";
import { Table, Input, Alert, Button } from 'reactstrap';
import {PlusCircleIcon} from '@primer/octicons-react'
import axios from "axios";
import Debito from "../Debito";

export default function Extrato({ idCadastro, handleShow }) {

    const [debitos, setDebitos] = useState([]);


    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
    };

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        getDebito(idCadastro);
    }, [idCadastro]);

    return (
        debitos.length > 0 ? (<>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {debitos.map(debito => {
                        return (
                            <tr key={debito.iddebito}>
                                <td>{debito.desctipo}</td>
                                <td>{debito.descdebito}</td>
                                <td>{formataMoeda(debito.valordebito)}</td>
                                <td>{formataData(debito.vctodebito)}</td>
                                <td>{debito.idpgto ? 'Pago' : <Input type="checkbox" />}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div>
                <Button color="primary" onClick={handleShow}><PlusCircleIcon size={24} /> Débito</Button>
            </div>
        </>
        ) : (<>
            <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
            <div>
                <Button color="primary" onClick={handleShow}><PlusCircleIcon size={24} /> Débito</Button>
            </div>
        </>)

    );
}
