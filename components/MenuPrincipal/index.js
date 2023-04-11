import { React, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Jumbotron, Row, Col } from 'reactstrap';
import Extrato from '../Extrato';
import Inscricao from '../Inscricao';
import PrestacaoContas from '../PrestacaoContas';

export default function MenuPrincipal() {

    const [isOpen, setIsOpen] = useState(false);
    const [isExtrato, setIsExtrato] = useState(false);
    const [isInscricao, setIsInscricao] = useState(false);
    const [isPrestacaoContas, setIsPrestacaoContas] = useState(false);

    const handleInativa = () => {
        setIsOpen(false);
        setIsExtrato(false);
        setIsInscricao(false);
        setIsPrestacaoContas(false);
    }

    const handleExtrato = () => {
        handleInativa();
        setIsExtrato(true);
    }

    const handleInscricao = () => {
        handleInativa();
        setIsInscricao(true);
    }

    const handlePrestacaoContas = () => {
        handleInativa();
        setIsPrestacaoContas(true);
    }

    const handleMain = () => {
        handleInativa();
    }

    return (
        <>
            <div className="text-center pt-2 web-class header-class">
                <h3>Sistema de Gerenciamento Cruzeiro do Sul</h3>
            </div>
            <div className="text-center pt-2 mobile-class header-class">
                <h3>SGCS</h3>
            </div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/" onClick={() => handleMain()}><strong>Cruzeiro do Sul</strong></NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#" onClick={() => handleExtrato()}>Extrato</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={() => handleInscricao()}>Inscrição</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={()=> handlePrestacaoContas()}>Prestacao de Contas</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Débito</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Row>
                {isExtrato ? <Extrato true /> : null}
                {isInscricao ? <Inscricao /> : null}
                {isPrestacaoContas ? <PrestacaoContas /> : null}
            </Row>
        </>
    )
}


