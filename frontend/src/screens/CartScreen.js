import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen() {
    console.log('cart')
    const { id } = useParams()
    console.log('cart item id', id)
    const location = useLocation()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('cartiyems', cartItems)
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (id) {
    //         dispatch(addToCart(id))
    //     }
    // }, [dispatch, id])

    const removeFromCartHandler = (id) => {
        console.log('remove', id)
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message variant="info" >
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.painting}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/painting/${item.painting}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    
                                    <Col md={1}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.painting)}
                                        >
                                            <i className='fas fa-trash'></i>

                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                        )
                        }
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Subtotal (
                            {cartItems.length})  items
                        </h2>
                        ${cartItems.reduce((acc, item) => acc + Number(item.price), 0)}     
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={ cartItems.length === 0}
                            onClick={checkOutHandler}
                        >
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
}

export default CartScreen