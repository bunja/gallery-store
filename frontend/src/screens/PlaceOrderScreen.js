import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'


import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

function PlaceOrderScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    // console.log('PLACE ORDER SCREEN order====>', order)
    console.log('PLACE ORDER SCREEN cart img url', cart.cartItems[0].images)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)
    
    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2)
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    if (!cart.paymentMethod){
        navigate('/payment')

    }

    useEffect(() => {
        // console.log("my order id WHERE THE FUCK IT???", order._id)
        if (success) {
            navigate(`/order/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET})
        }
    
    }, [success, navigate])

const placeOrder = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
    }))
}

return (
    <div>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong> Shipping: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {' '}
                            {cart.shippingAddress.postalCode},
                            {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong> Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ?
                            <Message varianr='info'>
                                Your cart is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>

                                                <Col md={1}>
                                                    <Image src={item.images} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/painting/${item.painting}`}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                € {item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Col>
                                Items:
                            </Col>
                            <Col>
                            € {cart.itemsPrice}
                            </Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Col>
                                Shipping:
                            </Col>
                            <Col>
                            € {cart.shippingPrice}
                            </Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Col>
                                Tax:
                            </Col>
                            <Col>
                            € {cart.taxPrice}
                            </Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Col>
                                Total:
                            </Col>
                            <Col>
                            € {cart.totalPrice}
                            </Col>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={placeOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
)
}

export default PlaceOrderScreen