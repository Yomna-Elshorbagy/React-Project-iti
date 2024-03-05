import React from 'react'
import { Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { Link} from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="  bg-dark text-light text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-3">
            <h5 className="mb-3">About Us</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus dolor maxime magni quae fugit? Voluptatibus, quo facilis amet fuga iure voluptate! Eum nulla perspiciatis voluptatibus minus iure explicabo atque facilis. </p>
          </div>
          <div className="col-lg-4 mb-3">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled">
            
          <li><Nav.Link as={Link} to="home" className="mx-lg-4">Home</Nav.Link></li>
          <li><Nav.Link as={Link} to="shop/product" className="mx-lg-4" >Product</Nav.Link></li>
          <li><Nav.Link as={Link} to="contact" className="mx-lg-4">Contact</Nav.Link></li>
          <li><Nav.Link as={Link} to="about" className="mx-lg-4" >About</Nav.Link></li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: Yomna@gmail.com</p>
            <p>Phone: +11224466880</p>
            <div className="social-icons">
              <Nav.Link as={Link} to="#" className="text-light me-2"><FaFacebook /></Nav.Link>
              <Nav.Link as={Link} to="#" className="text-light me-2"><FaTwitter /></Nav.Link>
              <Nav.Link as={Link} to="#" className="text-light me-2"><FaGoogle /></Nav.Link>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>&copy; {new Date().getFullYear()} Yomna Mohamed All Rights Reserved.</p>
      </div>
    </footer>
  )
}
