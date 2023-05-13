import '../App.css';
import { Navbar, Nav } from 'react-bootstrap'

function NavigationBar () {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky='top'>
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
        </Navbar>
    );
}

export default NavigationBar;
