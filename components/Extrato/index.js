import { React, useState, useEffect, Fragment, Row, Button } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";
import Debito from "../Debito";

export default function Extrato({ idCadastro }) {

    const [debitos, setDebitos] = useState([]);


    const getDebito = async (idCadastro) => {
        await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/debitos/' + idCadastro)
            .then((response) => setDebitos(response.data))
            .catch((error) => console.error(error));
        console.log('debitos ', debitos);
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
        debitos.length > 0 ? (<Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {console.log(debitos.iddebito)}
                    {debitos.map(debito => {
                        return (
                            <tr key={debito.iddebito}>
                                <td>
                                    {debito.descdebito}
                                </td>
                                <td>{formataMoeda(debito.valordebito)}</td>
                                <td>{formataData(debito.vctodebito)}</td>
                                <td>{debito.idpgto ? 'Pago' : <input type={"checkbox"} />}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Fragment>
        ) : <span>Não foram encontrados debitos para o desbravador</span>

    );
}
