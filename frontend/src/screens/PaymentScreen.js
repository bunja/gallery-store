import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'

import { savePaymentMethod } from '../actions/cartActions'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

function PaymentScreen() {
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')

    }

    if (!shippingAddress.address)
        navigate('/shipping')

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <Form onSubmit={submitHandler}>
                <Form.Group className='pb-3'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='Paypal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='pb-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen