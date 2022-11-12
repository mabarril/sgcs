import { React, useState, useEffect } from "react";
import { Table, Alert, Button } from 'reactstrap';
import axios from "axios";


export default function Extrato({ idCadastro, dbv, handleShowDebito }) {

    const [debitos, setDebitos] = useState([]);
    const [arrayDebitos, setArrayDebitos] = useState([]);

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

    const handleSelectDebito = (debito) => {
        debito = {...debito, "nome" : dbv.nome};
        if (arrayDebitos.filter(item => item.iddebito === debito.iddebito).length === 0) {
            setArrayDebitos(debitos => [...debitos, debito])
        }
    };

    useEffect(() => {
        getDebito(idCadastro);
    }, [idCadastro]);

    return (
        <>
            {debitos.length > 0 ? (<>
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
                                    <td>{debito.idpgto ? 'Pago' :
                                        <Button
                                            onClick={(e) => { handleSelectDebito(debito) }} ><i className="bi bi-cash-coin"></i></Button>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </>
            ) : (<>
                <Alert color="warning">Não foram encontrados debitos para o desbravador</Alert>
            </>)}
            < div >
                <Button color="primary" onClick={handleShowDebito}> <i class="bi bi-plus-circle"></i> Débito</Button>{" "}
            </div >
            {arrayDebitos.length > 0 ? (
                < Table hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arrayDebitos.map(debito => {
                                return (

                                    <tr key={debito.iddebito}>
                                        <td>{debito.nome}</td>
                                        <td>{debito.desctipo}</td>
                                        <td>{debito.descdebito}</td>
                                        <td>{formataMoeda(debito.valordebito)}</td>
                                        <td>{formataData(debito.vctodebito)}</td>
                                        {/* <td>{debito.idpgto ? 'Pago' :
                                <Button
                                    onClick={(e) => { handleSelectDebito(debito) }} ><i class="bi bi-cash-coin"></i></Button>}
                            </td> */}
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>)
                : <p>{arrayDebitos.length}</p>}
        </>
    );

}
