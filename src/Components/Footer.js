import '../App.css';
import { Container, Navbar, } from 'react-bootstrap'

function Footer () {
    return (
        <Navbar expand="lg" bg="dark" variant="dark" fixed="bottom">
            <Container>
                <Navbar.Text className="mx-auto">Author: Julia Bartosik</Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Footer;
