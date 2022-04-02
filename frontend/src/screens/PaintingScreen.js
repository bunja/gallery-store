import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import axios from 'axios'

// import paintings from '../paintings'


function PaintingScreen() {
    const { id } = useParams()
    const [painting, setPainting] = useState([])
    console.log("ID", id)

    useEffect(() => {
        console.log("use effect")
        async function fetchPainting() {

            const { data } = await axios.get(`/api/paintings/${id}`)
            console.log("fetch painting", data)
            setPainting(data)
        }
        fetchPainting()
    }, [])

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
                            <h3>{painting.name}</h3>
                        </ListGroup.Item>



                        <ListGroup.Item>
                            Price:{painting.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description:{painting.description}
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