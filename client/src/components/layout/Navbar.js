import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth'
import { Fragment } from 'react';

const NavigationBar = ({auth: {isAuthenticated, loading}, logout}) => {
const authLinks =  ( <>
  <Nav.Link href="/dashboard" >home</Nav.Link>
  <Nav.Link href="/login" onClick={logout}>logout</Nav.Link>
</>)
const guestLinks = ( <>
  <Nav.Link href="/register">register</Nav.Link>
  <Nav.Link href="/login">login</Nav.Link>
</>)

  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            SMART <span style={{color:'green'}}> Pump </span>
          </Navbar.Brand>
          <Nav className="ms-auto">
          {!loading && (<Fragment>
          {isAuthenticated ? authLinks : guestLinks}
          </Fragment>)}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

NavigationBar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, {logout}) (NavigationBar);