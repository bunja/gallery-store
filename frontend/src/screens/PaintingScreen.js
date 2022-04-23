import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPaintingDetails } from '../actions/paintingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { alignPropType } from 'react-bootstrap/esm/types'

function PaintingScreen() {
    const { id } = useParams()
    console.log("id", id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const paintingDetails = useSelector(state => state.paintingDetails)
    const { error, loading, painting } = paintingDetails
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const [ mainImage, setMainImage ] = useState('')
    

    let isInCart = false; 
    console.log('cartItems', cartItems)
    console.log('painting ====>', painting)

    if (cartItems && cartItems.find(y => y.painting === parseInt(id))) {
        isInCart = true;
        console.log("FUUUUCK")
    }

    useEffect(() => {
        console.log('Use effect', id)
        dispatch(listPaintingDetails(id))
        
    }, [dispatch, id])
   
    const addToCartHandler = () => {
        console.log('addToCartHandler triggered', id)
        dispatch(addToCart(id))
       
        navigate(`/cart`)
    }

    if (painting.length == 0) {
        return <Loader/>
    }

    if (mainImage == '') {
        setMainImage(painting.images[0].imageUrl)
    }

    const changeMainImage = (imageUrl) => {
        console.log("LOOOOOL")
        setMainImage(imageUrl)
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
                                <div class="images-main">
                                    <Image src={mainImage} alt={painting.images[0].name} fluid />
                                </div>
                                <div class="images-gallery">
                                    {painting && painting.images.map(image =>    
                                        <Image
                                            key={image._id}
                                            src={image.imageUrl} 
                                            alt={image.name} fluid
                                            onClick={e => changeMainImage(image.imageUrl)}
                                        />
                                    )}
                                </div>
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
                                                disabled={!painting.isAvailable || isInCart }
                                            >
                                            { isInCart ? 'Already in Cart' : 'Add to Cart' }
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