
import React, { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listPaintingDetails, updatePainting } from '../actions/paintingActions'
import { PAINTING_UPDATE_RESET } from '../constants/paintingConstants'

import FormContainer from '../components/FormContainer'
import axios from 'axios'

function PaintingEditScreen() {

    const { id } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [year, setYear] = useState(2000)
    const [isAvailable, setIsAvailable] = useState(true)
    const [materials, setMaterials] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const paintingDetails = useSelector(state => state.paintingDetails)
    const { error, loading, painting } = paintingDetails
    console.log('painting info', painting)

    const paintingUpdate = useSelector(state => state.paintingUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = paintingUpdate
    console.log('paintingUpdate info', paintingUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PAINTING_UPDATE_RESET })
            navigate(`/admin/paintinglist`)
        } else {
            if (!painting.name || painting._id !== Number(id)) {
                dispatch(listPaintingDetails(id))
            } else {
                setName(painting.name)
                setPrice(painting.price)
                setImage(painting.image)
                setHeight(painting.height)
                setWidth(painting.width)
                setYear(painting.year)
                setIsAvailable(painting.isAvailable)
                setMaterials(painting.materials)
                setDescription(painting.description)
            }
        }

    }, [dispatch, painting, id, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updatePainting({ 
            _id: painting._id, 
            name, 
            price, 
            // images,
            height,
            width,
            year, 
            isAvailable,
            materials,
            description 
        }))

    }

    const uploadFileHandler = async (e) => {
        console.log('file is being uploaded')
        const files = e.target.files
        const formData = new FormData()

        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i])
        }

        formData.append('painting_id', id)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/paintings/upload/', formData, config)

            setImage(data)
            setUploading(false)
        } catch(error) {
            setUploading(false)
        }
    }

    return (<div>
        <Link to='/admin/paintinglist'>
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit Painting</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <
                Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter Price'
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter image'
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                >
                                </Form.Control>

                                <Form.Control
                                    // id='image-file'
                                    type='file'
                                    label='Choose File'
                                    custom
                                    multiple
                                    onChange={uploadFileHandler}
                                >

                                </Form.Control>
                                {/* {uploading && <Loader/>} */}
                             

                            </Form.Group>

                            <Form.Group controlId='height'>
                                <Form.Label>Height</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter Height'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='width'>
                                <Form.Label>Width</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter Width'
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='year'>
                                <Form.Label>Year</Form.Label>
                                <Form.Control

                                    type='number'
                                    placeholder='Enter Year'
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isavailable'>
                                
                                <Form.Check

                                    type='checkbox'
                                    label='Is Avaiable'
                                    checked={isAvailable}
                                    onChange={(e) => setIsAvailable(e.target.checked)}
                                >

                                </Form.Check>
                            </Form.Group>

                            <Form.Group controlId='materials'>
                                <Form.Label>Materials</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Materials'
                                    value={materials}
                                    onChange={(e) => setMaterials(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            
                            <Form.Group controlId='description'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control

                                    type='text'
                                    placeholder='Enter Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>


                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )
            }



        </FormContainer>

    </div>

    )
}

export default PaintingEditScreen