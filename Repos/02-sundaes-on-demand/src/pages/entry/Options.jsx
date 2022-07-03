import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScoopOption from './ScoopOption';
import ToppingOption from './ToppingOption';
import { Row } from 'react-bootstrap'

function Options({optionType}) {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:3030/${optionType}`)
        .then(response => setItems(response.data))
        .catch(error => {
            // TODO: handle error response
        })
    }, [optionType]);
    
    // TODO: replace 'null' with ToppingOption when available
    const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption

    const optionItems = items.map(item => (
        <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>
    ))

    return (
    <Row>
        {optionItems}
    </Row>
    )
}

export default Options;