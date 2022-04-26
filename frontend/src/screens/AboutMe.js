import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
// import Painting from '../components/Painting'
import Loader from '../components/Loader'
import Message from '../components/Message'
import resume from '../resume'
// import Paginate from '../components/Paginate'
// import { listPaintings } from '../actions/paintingActions'
import { useNavigate, useLocation } from 'react-router-dom'

function AboutMe() {
    console.log('resume.languages',resume.languages)
  return (
    <div>
        <Row>
        <Col md={4}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Image src={resume.image} className='my-image'/>
                </ListGroup.Item>
                <ListGroup.Item>
                    <p>Email:{resume.email}</p>
                </ListGroup.Item>

                <ListGroup.Item>
                   <p>City:{resume.city}</p> 
                </ListGroup.Item>

                <ListGroup.Item>
                    Languages:
                    {Object.entries(resume.languages).map(([key, value]) => (
                        <div key={key}>{key} : {value}</div>
                    )
                        
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
       
       
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                   <h1>{resume.name}</h1> 
                   <p>
                       Yon know what? I am like you know, ready to be a star. You know that, right?
                   </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div>
                        <h3>Projects:</h3>
                       <p>
                       Dis web site:&nbsp; 
                        {resume['tech-stack'].frontend}
                        {resume['tech-stack'].backend}</p> 

                       <p>Another web site:&nbsp; 
                        {resume['tech-stack']['backend']}</p> 

                        <p>Also somehow in the past i did kita finder
                        and something else and more over I hate myself for just being stupid me</p>
                    </div>

                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Expirience:</h3>
                    <p>
                        {resume.expirience.job}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Education:</h3>
                    <div>
                    {Object.entries(resume.education).map(([ke, value]) => (
                        <div key={ke}>{ke} : {value}</div>
                    ) )}
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                   <h3>About me:</h3> 
                    <div>{resume.about.description}</div>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        </Row>
    </div>
  )
}

export default AboutMe