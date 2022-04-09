import { React, useState, useEffect, Fragment } from "react";
import { Table } from 'react-bootstrap';
import axios from "axios";

export default function Debitos({ idCadastro }) {

    const [debitos, setDebitos] = useState([]);

    const getDebito = async (idCadastro) => {
        console.log('ccc ', idCadastro);
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
        console.log(idCadastro);
        getDebito(idCadastro);
    }, [idCadastro]);

    return (
        <Fragment>
            {debitos.length>0 ? (
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
                                    <td >
                                        {debito.descdebito}
                                    </td>
                                    <td>{formataMoeda(debito.valordebito)}</td>
                                    <td>{formataData(debito.vctodebito)}</td>
                                    <td>{debito.idpgto ? 'Pago' : <input type={"checkbox"} />}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            ) : <span>Não foram encontrados debitos para o desbravador</span>}
        </Fragment>
    );
}
