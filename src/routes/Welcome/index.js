import React from "react";

import { Container, Row, Col, Image } from 'react-bootstrap';

//import { Col, Row,Badge,Divider ,Tooltip } from 'antd';

function Welcome () {


  return (

    <div className="gx-main-welcome-content-wrapper background-image">
    <Container fluid  >
    <Row>
      <Col md={6} className={"animated fadeIn image-container"}>
        Normativa next ADMIN
      </Col>
      <Col md={6} className={"animated fadeIn image-container"}>
      </Col>
    </Row>
  </Container>
  </div>

  );
};

export default Welcome;
