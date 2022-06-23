import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState} from 'react'
import {Link,Navigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'

import PropTypes from 'prop-types'



function Register({setAlert,register, isAuthenticated}) {
  const [formData, setFormData] = useState({
    age: '',
    eyeColor: '',
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  })

  const {age, eyeColor, firstName, lastName,company,email, password, phone, address} = formData
  
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })

  const onSubmit = async e => {
    e.preventDefault();
    register({
        age, eyeColor, firstName, lastName,company,email, password, phone, address
    })
  }

    //Redirect if logged in
    if(isAuthenticated){
      return <Navigate to="/dashboard"/>
    }

  return (
    <Container fluid>
        <Form onSubmit={e=>onSubmit(e)}>

      <Row style={{marginTop: "5%"}} >

        <Col lg={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}  >
            <h1>Register</h1>
        </Col>
        <Col lg={{ span: 3, offset: 3 }}  >


          <Form.Group className="mb-3">
            <Form.Label>*First Name</Form.Label>
            <Form.Control placeholder="Enter first name" value={firstName} name="firstName" onChange={e => onChange(e)}/>
            <Form.Text className="text-muted">
        
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>*Last Name</Form.Label>
            <Form.Control placeholder="Enter last name" value={lastName} name="lastName" onChange={e => onChange(e)}/>
            <Form.Text className="text-muted, text-danger">

            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>*Email address</Form.Label>
            <Form.Control placeholder="Enter email" value={email} name="email" onChange={e => onChange(e)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>*Create Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} name="password" onChange={e => onChange(e)} />
            <Form.Text className="text-muted">
            *required fields
            </Form.Text>
          </Form.Group>

          
      </Col>  
      <Col lg={{ span: 3}} >
      <Form.Group className="mb-3" >
            <Form.Label>Age</Form.Label>
            <Form.Control type="numeric" placeholder="Enter age" value={age} name="age" onChange={e => onChange(e)} />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Eye Color</Form.Label>
            <Form.Control type="numeric" placeholder="Enter eye color" value={eyeColor} name="eyeColor" onChange={e => onChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Company</Form.Label>
            <Form.Control  placeholder="Enter company name" value={company} name="company" onChange={e => onChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="numeric" placeholder="Enter phone number" value={phone} name="phone" onChange={e => onChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Address </Form.Label>
            <Form.Control type="numeric" placeholder="Enter address" value={address} name="address" onChange={e => onChange(e)} />
        </Form.Group>
        
 
    </Col> 
  
      </Row>
      <Row style={{marginBottom:"10%"}}>
        <Col lg={{ span: 3, offset: 3 }}>
        <Button variant="success" size="sm" type="submit">
          submit
          </Button> 
          <p> <small>already have an account? <Link to='/login'>
            login here.
          </Link></small></p> 
        </Col>
      </Row>
       </Form>
    </Container>
  );
}
Register.protoTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {setAlert, register}) (Register);