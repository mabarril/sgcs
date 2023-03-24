import { React, useState, useRef, } from "react";
import axios from "axios";
import Image from 'next/image';
import { Row, Col } from "reactstrap";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import logo from "../../public/logo_clube.jpg";

export default function Recibo()  {
    const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //   content: () => componentRef.current,
    // });


    const [pagamento, setPagamento] = useState([]);

    const handleRecibo = (id) => {
        const res = async () => { 
            await axios.get('https://www.iasdcentraldebrasilia.com.br/cruzeirodosul/sgcs/dbv-api/pagamento/',
            // await axios.get('http://localhost/dbv-api/pagamento/' 
            + id).data };
        console.log(res);
        while (pagamento.size == 0) {
            if (res.size > 0) {
                setPagamento(res);
            }
        };
    }

  

    return (
        <Card title="Recibo de Pagamento">
            <Row>
                <Col md="2" sm="2">
                    <Image
                        src={logo}
                        alt="A picture of white cats"
                        width={150}
                        height={150}
                        placeholder="blur"
                    />
                </Col>
                <Col md="10" sm="10">
                    <p className="m-0">
                        Dados do Responsável:
                    </p>
                    <p className="m-0">
                        Valor:
                    </p>
                    <p className="m-0">
                        Forma de Pagamento:
                    </p>
                    <p className="m-0">
                        Data:
                    </p>
                </Col>
            </Row>
            <Row>
                <DataTable value={pagamento} size='small' tableStyle={{ minWidth: '50rem' }}>
                    <Column field="id" header="Code"></Column>
                    <Column field="dtpagamento" header="Name"></Column>
                    <Column field="valorpagamento" header="Category"></Column>
                    <Column field="resppagamento" header="Quantity"></Column>
                    <Column field="tipopagamento" header="Quantity"></Column>
                </DataTable>
            </Row>
        </Card >
    )
}