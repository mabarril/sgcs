import { React, useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Jumbotron, Row, Col } from 'reactstrap';
import Extrato from '../Extrato';
import Pagamento from '../Pagamento';

export default function MenuPrincipal() {

    const [isOpen, setIsOpen] = useState(false);
    const [isExtrato, setIsExtrato] = useState(false);

    const handleExtrato = () => {
        setIsOpen(false);
        setIsExtrato(true);
    }

    const handleMain = () => {
        setIsOpen(false);
        setIsExtrato(false);
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
                            <NavLink href="#">Pagamento</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#">Débito</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            <Row md="2" sm="1">
                <Col md="8" sm="12">
                    {isExtrato ? <Extrato true /> : null}
                </Col>
                <Col md="4" sm="12">
                    <Pagamento/>
                </Col>
            </Row>
        </>
    )
}


