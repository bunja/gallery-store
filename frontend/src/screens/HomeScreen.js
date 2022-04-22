import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Painting from '../components/Painting'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listPaintings } from '../actions/paintingActions'
import { useNavigate, useLocation } from 'react-router-dom'


// import paintins from '../paintings'

function HomeScreen() {
    const navigate = useNavigate()
    let location = useLocation()

    const dispatch = useDispatch()
    const paintingList = useSelector(state => state.paintingList)
    const { error, loading, paintings, page, pages } = paintingList
    console.log('LOCATION', location)

    let keyword = location.search
    useEffect(() => {
        dispatch(listPaintings(keyword))
    }, [dispatch, keyword]);

    return (
        <div>
            <h1> Latest Paintings</h1>
            {loading ? <Loader />
                : error ? <Message variant='dark'>{error}</Message>
                    : <div>
                        <Row>
                            {paintings.map(painting => (
                                <Col key={painting._id} sm={12} md={6} lg={4} xl={3}>
                                    <h3>
                                        <Painting painting={painting} />
                                    </h3>
                                </Col>
                            ))}
                        </Row>
                        <Paginate
                            page={page}
                            pages={pages}
                            keyword={keyword}  
                        />
                    </div>
            }

        </div>
    )
}

export default HomeScreen