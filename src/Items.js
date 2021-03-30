import React from 'react'
import Item from './Item'
import PropTypes from 'prop-types'

const Items = props => {
    // map the items from props into an array
    const itemList = props.items.map((newItem) => 
        <Item key = {newItem.id} 
              item = {newItem} 
              fetchAllItems = {props.fetchAllItems} />
    )

    return (
        <div>
            <ul style={{ listStyleType: "none" }} >{itemList}</ul>
        </div>
    )
}

Items.propTypes = {
    items: PropTypes.array, 
    fetchAllItems: PropTypes.func,
}

export default Items;
