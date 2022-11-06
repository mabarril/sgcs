import { React, useState, useEffect } from "react";
import { Table, Input, Alert, Button } from 'reactstrap';
import { PlusCircleIcon } from '@primer/octicons-react'
import axios from "axios";


export default function Extrato({ idCadastro, handleShowDebito }) {

    const [debitos, setDebitos] = useState([]);
    const [idDebitos, setIdDebitos] = useState([]);
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
        
        if (arrayDebitos.length === 0) {
            arrayDebitos.push(debito);
            console.log(arrayDebitos);
        } else {
            if (arrayDebitos.filter(item => item.iddebito == debito.iddebito ).length > 0) {
                console.log("&&&&&&");
            }

        }
    };

    useEffect(() => {
        getDebito(idCadastro);
        setArrayDebitos([]);
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
                                        <Input type="checkbox"
                                            onChange={(e) => { handleSelectDebito(debito) }} />}
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
                <Button color="primary" onClick={handleShowDebito}><PlusCircleIcon size={24} /> Débito</Button>{" "}
                {/* <Button color="success" onClick={handleShow}><PlusCircleIcon size={24} /> Pagamento</Button> */}
            </div >
        </>
    );

}
