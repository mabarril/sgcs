import { React, useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar'
import { TabView, TabPanel } from 'primereact/tabview';
import axios from "axios";
import DetalhePrestacaoContas from "./DetalhePrestacaoContas";
import { Row, Col } from "reactstrap";


export default function PrestacaoContas() {


    const [pagamentos, setPagamentos] = useState([]);
    const [itens, setItens] = useState([]);
    const [date, setDate] = useState(null);
    const [valor, setValor] = useState(0);

    useEffect(() => {
        axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/pagamento',
            // axios.get('http://localhost/dbv-api/desbravador',
        )
            .then(async (response) => {
                setPagamentos(await response.data);
            })
            .catch(function (error) {
            });
    }, [handleSelectData, handleSelectMes]);



    const handleSelectMes = (e) => {

        
        let mes = e.value;
        console.log(mes);

        const itensFiltrado = pagamentos.filter(itens => itens.dtpagamento.substring(0,7) == mes.toISOString().split('T')[0].substring(0,7))

        setItens(itensFiltrado.map((item) => (
            {
                ...item,
                dataExibicao: formataData(item.dtpagamento),
                valor: formataMoeda(item.valorPagamento),
            }
        )));

        setValor(itensFiltrado.reduce(getTotal, 0));


    }

    const handleSelectData = (e) => {


        let data = e.value;

        const itensFiltrado = pagamentos.filter(itens => itens.dtpagamento == data.toISOString().split('T')[0])

        setItens(itensFiltrado.map((item) => (
            {
                ...item,
                dataExibicao: formataData(item.dtpagamento),
                valor: formataMoeda(item.valorPagamento),
            }
        )));

        setValor(itensFiltrado.reduce(getTotal, 0));

    }


    function getTotal(total, item) {
        return parseFloat(total) + parseFloat(item.valorPagamento);
    }


    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    return (
        <>
            <Row>
                <Col>
                    <span>Selecione o data</span>
                    <div className="flex pb-5">
                        <Calendar value={date} onChange={(e) => handleSelectData(e)} showIcon />
                    </div>
                </Col>
                <Col>
                    <span>Selecione o mês</span>
                    <div className="flex pb-5">
                        <Calendar value={date} onChange={(e) => handleSelectMes(e)} view="month" dateFormat="mm/yy" />
                    </div>

                </Col>
            </Row>
            <DetalhePrestacaoContas itens={itens} valor={valor} />

        </>
    )

}

