import React from 'react'
import { Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

function Painting({ painting }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/painting/${painting._id}`}>
                <Card.Img src={painting.images[0].imageUrl} />
            </Link>

            <Card.Body>
                <Link to={`/painting/${painting._id}`}>
                    <Card.Title as="div">
                        {painting.name} 
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <div className="my-4">
                    {painting.height} x {painting.width} cm
                    </div>
                </Card.Text>

                <Card.Text as="div">
                    <div className="my-3">
                        {painting.materials}
                    </div>
                </Card.Text>


                <Card.Text as="h4">
                    ${painting.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}



export default Painting