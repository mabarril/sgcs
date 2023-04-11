import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Link } from "@mui/material";

export default function DetalhePrestacaoContas ({itens, valor}) {


    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const handleRecibo = (idpgto) => {

        let link = "https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/recibo/recibo_pgto.php/?lancamento=" + idpgto;
        window.open(link);
    }

    return <div>
        <DataTable value={itens} size="small" tableStyle={{ minWidth: '50rem' }} selectionMode="single" 
        onSelectionChange={(e) => handleRecibo(e.value.id)
        } dataKey="itens.id">
            <Column field="dataExibicao" header="Data"></Column>
            <Column field="respPagamento" header="Responsável"></Column>
            <Column field="valor" header="Valor"></Column>
            <Column field="desctipo" header="Tipo"></Column>
            <Column field="id" header="Nr. Recibo"></Column>
        </DataTable>
        <h3>Total : {formataMoeda(valor)}</h3>
    </div>
}