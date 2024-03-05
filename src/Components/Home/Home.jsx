import React from 'react'
import { Helmet } from 'react-helmet'
import { Carousel } from 'react-bootstrap';
import image1 from '../../Assets/images/image1.png'
import image2 from '../../Assets/images/image1.png'
import image3 from '../../Assets/images/image1.png'
import Product from '../Product/Product';

export default function Home() {

  return (<>
   <Helmet>
  <title>Home Page </title>
  <meta name="description" content="Your page description" />
   </Helmet>
   <h1 className='text-center'> Welcome to Our Romanza Store</h1>

   <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel><br></br><h1> </h1>
    <Product />
    </>
  )
}
