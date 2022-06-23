import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from "../../actions/auth"


const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {email, password} = formData
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password)
  }

  //Redirect if logged in
  if(isAuthenticated){
    return <Navigate to="/dashboard"/>
  }

  return (
    <Container fluid>
      {!isAuthenticated && 
      <Row style={{marginTop: "5%", marginBottom: "50%"}} >
      <Col lg={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}  >
      <h1>Welcome Back!</h1>
        <Form onSubmit={e=>onSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control placeholder="Enter email" value={email} name="email" onChange={e => onChange(e)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={e => onChange(e)} />
          </Form.Group>
          <Button variant="success" size="sm" type="submit">
          login
          </Button> 
          <p> <small>don't have an account? <Link to='/register'>
           Create one here
          </Link></small></p> 
        </Form>
      </Col>     
      </Row > }
    </Container>
  );
}

Login.protoTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps,{login})(Login);