import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Button, Alert, Col, Row, FormControl } from 'react-bootstrap';
import { Helmet } from 'react-helmet'


export default function Register() {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState(null);

  async function register(values) {
    try {
      console.log('Register function called');

      const { data } = await axios.post('https://yomnaelshorbagy.onrender.com/users/signup', values);

      if (data && data.message === 'added') {
        navigate('/login');
      } else if (data.message === 'User alredy register') {
        setBackendError(data.message);
      }
    } catch (error) {
      console.error('Error in register function:', error);
      if (axios.isAxiosError(error) && error.response) {
        setBackendError(error.response.data.data.message);
      } else if (error.request) {
        setBackendError('No response received from the server. Please try again.');
      } else {
        setBackendError('An error occurred. Please try again.');
      }
    }
  }

  const validationSchema = Yup.object({
    userName: Yup.string().min(3, 'Username is too short').max(20, 'Username is too long').required('Username is required'),
    email: Yup.string().email('Invalid Email').required('Email is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, 'Password must be strong').required('Password is required'),
    Cpassword: Yup.string().oneOf([Yup.ref('password')], 'Password and Password Confirm should be the same').required(
      'Password Confirm is required'
    ),
    age: Yup.number(),

    address: Yup.array()
      .of(
        Yup.object().shape({
          city: Yup.string(),
          Street: Yup.string(),
        })
      ),
      // .required('At least one address is required'),
  });

  const registerForm = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      Cpassword: '',
      address: [{ city: '', Street: '' }],
      age: 0,
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
      <Helmet>
        <title>Sign up Page </title>
        <meta name="description" content="Your page description" />
      </Helmet>

      <h1 className='text-center mt-5'>Sign up</h1>
      <Form className="w-50 mx-auto my-5" onSubmit={registerForm.handleSubmit}>
        {backendError && <Alert variant="danger">{backendError}</Alert>}

        <Form.Group controlId="userName" className="mb-1">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            value={registerForm.values.userName}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.userName && registerForm.touched.userName && (
            <Alert variant="danger">{registerForm.errors.userName}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="mb-1">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={registerForm.values.email}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.email && registerForm.touched.email && (
            <Alert variant="danger">{registerForm.errors.email}</Alert>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mb-1">
          <Form.Label>Password</Form.Label>
          <FormControl
            type="password"
            name="password"
            value={registerForm.values.password}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.password && registerForm.touched.password ? (
            <Alert variant="danger">{registerForm.errors.password}</Alert>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Cpassword" className="mb-1">
          <Form.Label>Password Confirm</Form.Label>
          <FormControl
            type="password"
            name="Cpassword"
            value={registerForm.values.Cpassword}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.Cpassword && registerForm.touched.Cpassword ? (
            <Alert variant="danger">{registerForm.errors.Cpassword}</Alert>
          ) : null}
        </Form.Group>

        <Row className="d-flex">
          <Col className="w-50">
            <Form.Group controlId="Street" className="mb-1">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="address[0].Street"
                value={registerForm.values.address[0]?.Street}
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
              />
              {registerForm.errors.address && registerForm.touched.address && (
                <Alert variant="danger">
                  {/* {(registerForm.errors.address[0] as { Street?: string }).Street} */}
                  {registerForm.errors.address?.[0]?.Street ?? ''}

                </Alert>
              )}
            </Form.Group>
          </Col>

          <Col className="w-50">
            <Form.Group controlId="city" className="mb-1">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="address[0].city"
                value={registerForm.values.address[0]?.city}
                onBlur={registerForm.handleBlur}
                onChange={registerForm.handleChange}
              />
              {registerForm.errors.address && registerForm.touched.address && (
                <Alert variant="danger">
                  {/* {(registerForm.errors.address[0] as { city?: string }).city} */}
                  {(registerForm.errors.address?.[0]?.city ?? '')}
                </Alert>
              )}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="age" className="mb-1">
          <Form.Label>age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={registerForm.values.age}
            onBlur={registerForm.handleBlur}
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.age && registerForm.touched.age && (
            <Alert variant="danger">{registerForm.errors.age}</Alert>
          )}
        </Form.Group>

        <Form.Group className="mb-1">
          <Button type="submit" variant="info" className="d-block ms-auto">
            Register
          </Button>
        </Form.Group>
        <div className="my-3">
        <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
        </div>
      </Form>
    </>
  );
}
