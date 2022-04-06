import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPaintingDetails } from '../actions/paintingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function PaintingScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const paintingDetails = useSelector(state => state.paintingDetails)
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartItems', cartItems)
    const { error, loading, painting } = paintingDetails


    useEffect(() => {
        dispatch(listPaintingDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        console.log('addToCartHandler triggered', id)
        dispatch(addToCart(id))
        navigate(`/cart`)
    }

    const isInCart = () => {
        if (cartItems) {
            const x = cartItems.find(y => y.painting === id)
            if (x) {
                return true
            }

        } else {
            return false
        }
    }


return (
    <div>
        <Link to='/'>Go Back</Link>
        {loading ?
            <Loader />
            : error
                ? <Message variant='danger'>{error}</Message>
                : (
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
                                            <Col>{painting.isAvailable ? 'Available' : 'Sold'}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={!painting.isAvailable}
                                        >
                                           { isInCart() ? 'Already in cart' : 'Add to Cart' }
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)}
    </div>
)
}

export default PaintingScreen