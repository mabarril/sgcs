import { React, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Jumbotron, Row, Col } from 'reactstrap';
import Extrato from '../Extrato';
import Inscricao from '../Inscricao';
import Pagamento from '../Pagamento';

export default function MenuPrincipal() {

    const [isOpen, setIsOpen] = useState(false);
    const [isExtrato, setIsExtrato] = useState(false);
    const [isInscricao, setIsInscricao] = useState(false);


    const handleInativa = () => {
        setIsOpen(false);
        setIsExtrato(false);
        setIsInscricao(false);
    }

    const handleExtrato = () => {
        handleInativa();
        setIsExtrato(true);
    }

    const handleInscricao = () => {
        handleInativa();
        setIsInscricao(true);
    }

    const handleMain = () => {
        handleInativa();
    }

    return (
        <>
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
                            <NavLink href="#">Pagamento</NavLink>
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
            </Row>
        </>
    )
}


