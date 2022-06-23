import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useState, useEffect} from 'react'
import {Link,Navigate, NavLink, useNavigate} from 'react-router-dom'
import {connect} from 'react-redux'
import {setAlert} from '../../actions/alert'
import {updateUser,loadUser} from '../../actions/auth'

import PropTypes from 'prop-types'



function Edit({setAlert,updateUser,loadUser, auth: { isAuthenticated, loading, user }}) {
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
  let nav = useNavigate();
  useEffect(()=>{
    loadUser()
    setFormData({
        age: loading || !user.age ? '' : user.age,
        eyeColor: loading || !user.eyeColor ? '' : user.eyeColor,
        firstName: loading || !user.name.first ? '' : user.name.first,
        lastName: loading || !user.name.last ? '' : user.name.last,
        company: loading || !user.company ? '' : user.company,
        email: loading || !user.email ? '' : user.email,
        phone: loading || !user.phone ? '' : user.phone,
        address: loading || !user.address ? '' : user.address,
    })
}, [loading])

  const {age, eyeColor, firstName, lastName,company,email, phone, address} = formData
  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  })

  const onSubmit = async e => {
    const id = user._id
    e.preventDefault();

    updateUser({
        age, eyeColor, firstName, lastName,company,email, phone, address, id
    })

    nav("/dashboard")
  } 

  return (
    <Container fluid>
        {isAuthenticated && !loading && user !== null && 
        <Form onSubmit={e=>onSubmit(e)}>

      <Row style={{marginTop: "5%"}} >

        <Col lg={{ span: 6, offset: 3 }} sm={{ span: 6, offset: 3 }}  >
            <h1>Edit Profile</h1>
        </Col>
        <Col lg={{ span: 3, offset: 3 }}  >

        
          <Form.Group className="mb-3">
            <Form.Label>*First Name</Form.Label>
            <Form.Control  value={firstName} name="firstName" onChange={e => onChange(e)}/>
            <Form.Text className="text-muted">
        
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>*Last Name</Form.Label>
            <Form.Control value={lastName} name="lastName" onChange={e => onChange(e)}/>
            <Form.Text className="text-muted, text-danger">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>*Email address</Form.Label>
            <Form.Control value={email} name="email" onChange={e => onChange(e)}/>
          </Form.Group>

          <Form.Group className="mb-3" >
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="numeric"  value={phone} name="phone" onChange={e => onChange(e)} />
            <Form.Text className="text-muted">
            *required fields
            </Form.Text>
         </Form.Group>
          
      </Col>  
      <Col lg={{ span: 3}} >
      <Form.Group className="mb-3" >
            <Form.Label>Age</Form.Label>
            <Form.Control type="numeric" value={age} name="age" onChange={e => onChange(e)} />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Eye Color</Form.Label>
            <Form.Control type="numeric" value={eyeColor} name="eyeColor" onChange={e => onChange(e)} />
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Company</Form.Label>
            <Form.Control value={company} name="company" onChange={e => onChange(e)} />
        </Form.Group>

        <Form.Group className="mb-3" >
            <Form.Label>Address </Form.Label>
            <Form.Control type="numeric" value={address} name="address" onChange={e => onChange(e)} />
        </Form.Group>
        
    </Col> 
  
      </Row>
      <Row style={{marginBottom:"10%"}}>
        <Col lg={{ span: 3, offset: 3 }}>
        <Button variant="success" size="sm" type="submit">
          submit
        </Button> 
        </Col>
      </Row>
       </Form>
        }
    </Container>
)};

Edit.protoTypes = {
    auth: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired

}
const mapStateToProps = state => ({
    auth: state.auth,
})
export default connect(mapStateToProps, {setAlert, updateUser, loadUser}) (Edit);