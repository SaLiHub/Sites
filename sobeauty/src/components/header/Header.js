import './Header.scss';

// import { useState } from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import Card from 'react-bootstrap/Card';
// import { useAccordionButton, Button, Modal } from 'react-bootstrap';
// import { useContext } from 'react';
// import AccordionContext from 'react-bootstrap/AccordionContext';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';


// Import icons. 
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

function Header() {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <header className='header'>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Dank memes
              
              </Nav.Link>
            </Nav>
            <Nav className="header__social-net">
            
              <Nav.Link href="#instagram"><InstagramIcon/></Nav.Link>
              <Nav.Link href="#facebook"><FacebookIcon/></Nav.Link>
              {/* <Nav.Link href="#">More deets</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  );
}

export default Header;
