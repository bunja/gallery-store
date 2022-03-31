import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Painting from '../components/Painting'

import paintins from '../paintings'

function HomeScreen() {
  return (
    <div>
        <h1> Latest Paintings</h1>
        <Row>
            {paintins.map(painting => (
                <Col key={painting._id} sm={12} md={6} lg={4} xl={3}>
                    <h3>
                        <Painting painting={painting}/>
                    </h3>
                </Col>
            ))}
        </Row>
    </div>
  )
}

export default HomeScreen