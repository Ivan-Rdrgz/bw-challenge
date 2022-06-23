import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const Dashboard = ({ auth: { isAuthenticated, loading, user } }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      {isAuthenticated && !loading && user !== null ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Balance:</Modal.Title>
            </Modal.Header>
            <Modal.Body>{user.balance}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Row style={{ marginTop: "5%", marginBottom: "2%" }}>
            <Col
              lg={{ span: 8, offset: 2 }}
              sm={{ span: 6, offset: 3 }}
              className="d-flex justify-content-center"
            >
              <Image
                src={user.picture}
                roundedCircle
                style={{ width: "15vw" }}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "5%" }}>
            <Col
              lg={{ span: 8, offset: 2 }}
              sm={{ span: 6, offset: 3 }}
              className="d-flex justify-content-center"
            >
              
                <Link to="/edit"><Button size="sm">edit info
              </Button></Link>
              
              <Button
                variant="success"
                size="sm"
                onClick={handleShow}
                style={{ marginLeft: "10px" }}
              >
                check balance
              </Button>
            </Col>
          </Row>

          <Row style={{ marginBottom: "5%" }}>
            <Col
              lg={{ span: 4, offset: 2 }}
              md={{ span: 4, offset: 2 }}
              sm={{ span: 6, offset: 3 }}
              className="d-flex justify-content-center"
              style={{ flexDirection: "column" }}
            >
              <h5>
                Name: <small>{user.name.first + " " + user.name.last}</small>
              </h5>
              <h5>
                Age: <small>{user.age || "na"}</small>
              </h5>
              <h5>
                Eye color: <small>{user.eyeColor || "na"}</small>
              </h5>
              <h5>
                Company: <small>{user.company || "na"}</small>
              </h5>
            </Col>
            <Col
              lg={{ span: 4, offset: 0 }}
              md={{ span: 4, offset: 0 }}
              sm={{ span: 6, offset: 3 }}
              className="d-flex justify-content-center"
              style={{ flexDirection: "column" }}
            >
              <h5>
                Email: <small>{user.email}</small>
              </h5>
              <h5>
                Phone: <small>{user.phone || "na"}</small>
              </h5>
              <h5>
                Address: <small>{user.address || "na"}</small>
              </h5>
              <h5>
                Status: <small>{user.isActive ? "Active" : "Non Active"}</small>
              </h5>
            </Col>
          </Row>
        </>
      ) : (
        <div>LOADING</div>
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
