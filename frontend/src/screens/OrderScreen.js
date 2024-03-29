import React, { useState,  useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useParams, useNavigate, Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

function OrderScreen() {
    const { id } = useParams()
        
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
   
    const navigate = useNavigate()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails
    console.log("OrderScreen ===> order", order)
   
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
   
    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2)
    }
    // AY4lVVu8apcdcX2eJ09xE5qCrpNaRRnlhREBWlWNAP9YyCXs4V3YNkYqjgR-K6wvFfkb51CXOl6EaJZ8

    const addPayPalscript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=AY4lVVu8apcdcX2eJ09xE5qCrpNaRRnlhREBWlWNAP9YyCXs4V3YNkYqjgR-K6wvFfkb51CXOl6EaJZ8'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }
        if (!order || successPay || order._id !== Number(id) || successDeliver) {
            dispatch({type: ORDER_PAY_RESET})
            dispatch({type: ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(id))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalscript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, id, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }



    return loading ? (
        <Loader />
    ) : error ? (<Message variant="danger">{error}</Message>
    ) : (
        <div>
            <h1> Order: {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name:</strong>{order.user.name}</p>
                            <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong> Shipping: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {' '}
                                {order.shippingAddress.postalCode},
                                {' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='warning'>Not delivered</Message>
                            )}
                            
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong> Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='warning'>Not paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ?
                                <Message varianr='info'>
                                    Your order is empty
                                </Message> : (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>

                                                    <Col md={1}>
                                                        <Image src={`/images/${item.image}`} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/painting/${item.painting}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                         €{ item.price}
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
                                €{order.itemsPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Shipping:
                                </Col>
                                <Col>
                                €{order.shippingPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Tax:
                                </Col>
                                <Col>
                                €{order.taxPrice}
                                </Col>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Col>
                                    Total:
                                </Col>
                                <Col>
                                €{order.totalPrice}
                                </Col>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader></Loader>}
                                    {!sdkReady ? (
                                        <Loader/>
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                        { loadingDeliver && <Loader/>}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark As Delivered
                                </Button>
                            </ListGroup.Item>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

    
export default OrderScreen