// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';

import './Order.scss';

import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
// import "mdbreact/dist/css/mdb.css";
// import 'mdb-react-ui-kit/dist/css/mdb.min.css'
function Order() {
  return (
    <section className="order">
      <div className="container">
        <div className="order__wrapper">
          <FormPage/>
        </div>
      </div>
    </section>
  );
}


function FormPage (){
  return (
  <MDBContainer>
    <MDBRow>
      <MDBCol md="6" className="order__title-wrapper">
        <p className="h5 text-center mb-4">Замовте послугу прямо зараз</p>
      </MDBCol>
  
      <MDBCol md="6">
        <form>
          <div className="grey-text">
            <MDBInput label="Your name" icon="user" group type="text" validate error="wrong"
              success="right" />
            <MDBInput label="Your telephone" icon="phone" minLength="9" maxLength="14" group type="tel" pattern="^\+?3?8?(0\d{9})$" validate error="wrong"
              success="right" />
          </div>
          <div className="text-center">
            <MDBBtn outline color="info">
              Send
              <MDBIcon far icon="paper-plane" className="ml-1" />
            </MDBBtn>
          </div>
        </form>
      </MDBCol>
    </MDBRow>
  </MDBContainer>
  );
  };
  

export default Order;

