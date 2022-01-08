import { Container, Row, Col } from 'react-bootstrap';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer font-small pt-4">
      <Container fluid className="text-center text-md-left">
        <Row>
          <Col md="6">
            <h5 className="title">Footer Content</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </Col>
          <Col md="6">
            <h5 className="title">Social Networks</h5>  
            <ul className="footer__list">
              <li className="list-unstyled">
                <a href="#!">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 2</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 3</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Link 4</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="footer__copyright text-center py-3">
        <Container fluid>
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="https://www.sobuety.com"> Sobuety.com </a>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
