import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card} from 'react-bootstrap'

import paintings from '../paintings'


function PaintingScreen() {
    const { id } = useParams()
    console.log( id )
    const painting = paintings.find((p) => p._id == id ) 
    return (
        <div>
            <Link to='/'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={painting.image} alt={painting.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{ painting.name }</h3>
                        </ListGroup.Item>

                        

                        <ListGroup.Item>
                            Price:{ painting.price }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description:{ painting.description }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${painting.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{painting.available ? 'Available' : 'Sold'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block ' type='button' disabled={!painting.available}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PaintingScreen