import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Painting from '../components/Painting'
import axios from 'axios'

// import paintins from '../paintings'

function HomeScreen() {
    const [paintings, setPaintings] = useState([])

    useEffect(() => {
        async function fetchPaintings() {
            const { data } = await axios.get('/api/paintings')
             setPaintings(data)
        }
        fetchPaintings()
    }, [])

    return (
        <div>
            <h1> Latest Paintings</h1>
            <Row>
                {paintings.map(painting => (
                    <Col key={painting._id} sm={12} md={6} lg={4} xl={3}>
                        <h3>
                            <Painting painting={painting} />
                        </h3>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen