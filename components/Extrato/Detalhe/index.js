
import { React, useState, useEffect } from "react";
import { Button } from "reactstrap";
import { ToggleButton } from 'primereact/togglebutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataView } from 'primereact/dataview';
import { Message } from 'primereact/message';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from "axios";
import Debito from "../../Debito";

export default function Detalhe({ desbravador }) {


    const [debitos, setDebitos] = useState([]);
    const [modal, setModal] = useState(false);
    const [checked, setChecked] = useState(false);
    const [debitosSelecionados, setDebitosSelecionados] = useState([]);

    let resDebito = [];


    const getDebito = (idCadastro) => {
        try {
            axios.get('http://localhost/dbv-api/debito/' + idCadastro).then((response) => setDebitos(response.data));
        }
        catch { (error) => console.error(error) };
    };

    const handleDebito = () => {
        setModal(!modal);
    };

    const formataData = (param) => {
        var data = new Date(param)
        return data.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    }

    const formataMoeda = (valor) => {
        valor = parseFloat(valor);
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    const formataTipo = (tipo) => {
        let desctipo = [];
        switch (tipo) {
            case 1:
                desctipo = { tipo: "MENSALIDADE", color: "circle mensalidade" };
                break;
            case 2:
                desctipo = { tipo: "UNIFORME", color: "circle uniforme" };
                break;
            case 8:
                desctipo = { tipo: "CAMPORI", color: "circle campori" };
                break;
            case 9:
                desctipo = { tipo: "EVENTOS", color: "circle evento" };
                break;
            case 10:
                desctipo = { tipo: "INSCRIÇÃO", color: "circle evento" };
                break;
        }
        return desctipo;
    }

    const handleDebitoSelecionado = (item) => {
        let _debitosSelecionados = [...debitosSelecionados];

        if (_debitosSelecionados.some((itemPagar) => item.id === itemPagar.id)) 
            _debitosSelecionados = _debitosSelecionados.filter(itemPagar => itemPagar.id !== item.id)
        else
            _debitosSelecionados.push(item);
        
        setDebitosSelecionados(_debitosSelecionados);
    }

    useEffect(() => {
        getDebito(desbravador.id);
    }, [desbravador, modal]);



    const renderListItem = (item) => {
        return (
            <div className="col-12">
                <div className="flex flex-column align-items-center p-3 w-full md:flex-row" key={item.id}>
                    {/* <div className="md:w-3rem  md:my-0 md:mr-5 mr-0 my-5">
                        <h2 className={formataTipo(item.idtipdebito).color}> {item.desctipo.substring(0,1)}</h2>
                    </div> */}
                    <div className="text-center md:text-left md:flex-1">
                        <div className="text-2xl font-bold">{item.descdebito}</div>
                        <div className="mb-3">{formataData(item.vctodebito)}</div>
                    </div>
                    <div className="flex md:flex-column mt-5 justify-content-between align-items-center md:w-auto w-full">
                        <span className="align-self-center text-2xl font-semibold mb-2 md:align-self-end">{formataMoeda(item.valordebito)}</span>
                        <ToggleButton  
                            name="pagar"
                            value={item} 
                            id={item.id} 
                            checked={debitosSelecionados.some((itemPagar) => item.id === itemPagar.id)} 
                            onChange={(e) => handleDebitoSelecionado(item)} 
                            
                            offLabel="Pagar" 
                            onIcon="pi pi-check" 
                            

                            />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (debitos) => {
        return renderListItem(debitos)
    }

    return (
        <div className="p-3">
            <Accordion activeIndex={0}>
                <AccordionTab header="Débitos">
                    <div>
                        <div className="card">
                            {debitos.length > 0 ? (<DataView value={debitos} itemTemplate={itemTemplate} />) : <Message severity="warn" text="Não existem débitos" />}
                        </div>
                        <div className="m-3 grid justify-content-end">
                            <Button color="primary" onClick={handleDebito}> <i className="bi bi-plus-circle"></i> Débito</Button>
                        </div>
                    </div>
                </AccordionTab>
                <AccordionTab header="Tab 2">
                    <p>Tab 2</p>
                </AccordionTab>
            </Accordion>

            <Modal isOpen={modal}>
                <ModalHeader>
                    Débito
                </ModalHeader>
                <ModalBody><Debito idCadastro={desbravador.id} handleDebito={handleDebito} /></ModalBody>
            </Modal>

        </div>
    )
}