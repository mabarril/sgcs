import { React, useState, useEffect } from "react";
import { Row } from 'reactstrap';
import axios from "axios";
import ListaCadastro from "../ListaCadastro";
import Detalhe from "./Detalhe";

export default function Extrato({ handleShowDebito }) {

    const [desbravador, setDesbravador] = useState([]);
    const [debitos, setDebitos] = useState([]);


    // const handleSelectDebito = (debito) => {
    //     debito = { ...debito, "nome": dbv.nome };
    //     if (arrayDebitos.filter(item => item.iddebito === debito.iddebito).length === 0) {
    //         setArrayDebitos(debitos => [...debitos, debito])
    //     }
    // };

    // const handleRemoveItemPagamento = (debito) => {
    //     let arrayRemovido = (arrayDebitos.filter(item => item.iddebito != debito.iddebito))
    //     console.log(arrayRemovido);
    //     setArrayDebitos(arrayRemovido)
    // }


    useEffect(() => {
        const res = async () => { await axios.get('http://localhost:8080/debito/' + desbravador.id).data };
        while (debitos.size == 0) {
            if (res.size > 0) {
                setDebitos(res);
            }
        };
    }, [desbravador]);

    return (
        <>

            <Row className="p-3">
                <ListaCadastro setDesbravador={setDesbravador} />
            </Row>
            <Row className="p-3">
                {
                    desbravador.id != null ? (
                        <>
                            <Row>
                                <h3><strong>{desbravador.nome}</strong></h3>
                            </Row>
                            <Detalhe desbravador={desbravador}></Detalhe> 
                        </>
                    ) : null
                }
            </Row>
        </>
    );

}
