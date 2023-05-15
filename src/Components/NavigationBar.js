import '../App.css';
import { Navbar, Nav, Container } from 'react-bootstrap'

function NavigationBar () {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
            <Container>
            <Navbar.Brand className='mx-auto pl-2'>Front-end Currency Exchange 2023</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mx-auto">
                    <Nav.Link href="#aer">Average exchange rates</Nav.Link>
                    <Nav.Link href="#gp">Gold price</Nav.Link>
                    <Nav.Link href="#her">Historical exchange rates</Nav.Link>
                    <Nav.Link href="#cc">Currency converter</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
