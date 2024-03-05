
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import notFoundedImage from '../../Assets/images/error.png';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 Page</title>
        <meta name="description" content="Page Not Found" />
      </Helmet>
      <Container className="text-center mt-5">
        <Row>
          <Col>
            <h1>Page Not Found</h1>
            <h3>This page does not exist</h3>
            <Image src={notFoundedImage} alt="Error" fluid className="mt-3" />
          </Col>
        </Row>
      </Container>
    </>
  );
}
