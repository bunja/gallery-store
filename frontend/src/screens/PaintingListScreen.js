import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPaintings, deletePainting, createPainting } from '../actions/paintingActions'
import { PAINTING_CREATE_RESET } from '../constants/paintingConstants'


function PaintingListScreen() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const paintingList = useSelector(state => state.paintingList)
    const { loading, error, paintings} = paintingList

    const paintingDelete = useSelector(state => state.paintingDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = paintingDelete

    const paintingCreate = useSelector(state => state.paintingCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, painting: createdpainting} = productCreate


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

   
    // console.log('LIST PAINTINGS ', paintingList)

    useEffect(() => {
        dispatch({ type: PAINTING_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }

        if(successCreate){
            navigate(`/admin/painting/${createdPainting._id}/edit`)
        } else {
            dispatch(listPaintings())
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdPainting])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure yo want to delete this painting?')){
            dispatch(deletePainting(id))
        }
    }

    const createPaintingHandler = () => {
        //create 
        dispatch(createPainting())

    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Paintings</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3'
                            onClick={createPaintingHandler}>
                        <i className='fas fa-plus'></i>Create Painting
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            { loading 
                ? (<Loader/>)
                : error
                    ? ( <Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>WIDTH x HEIGHT</th>
                                <th>MATERIAS</th>
                                <th>YEAR</th>
                                <th></th>
                                </tr>
                                
                            </thead>

                            <tbody>
                                {paintings.map(painting => (
                                    <tr key={painting._id}>
                                        <td>{painting._id}</td>
                                        <td>{painting.name}</td>
                                        <td>{painting.price}</td>
                                        <td>{painting.width} x {painting.height} cm</td>
                                        <td>{painting.materials}</td>
                                        <td>{painting.year}</td>
                                        <td>
                                            <LinkContainer to={`/admin/painting/${painting._id}/edit`}>
                                                <Button variant='light' className="btn-sm">
                                                <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' 
                                                    className="btn-sm"
                                                    onClick={() => deleteHandler(painting._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    )

            }
        </div>
    )
}

export default PaintingListScreen