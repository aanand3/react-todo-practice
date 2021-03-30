import React from 'react'
import PropTypes from 'prop-types'

const Item = props =>
{
    // will strikethorugh if complete, regular o/w
    return (
        <li>
            <input
                type="checkbox"
                checked={!props.item.completed}
                onChange={() => toggleCompleted(props.item, props.fetchAllItems) }
            />

            {(props.item.completed) ?
                <span>{props.item.content}</span> :
                <del>{props.item.content}</del>}

            <button onClick = {() => deleteItem(props.item, props.fetchAllItems)}>Delete</button>
        </li>
    )
}

Item.propTypes = {
    item: PropTypes.object,

}

export default Item

async function patchCompletedStatus(oldItem) 
{
    try
    {
        const newItem = { completed: !oldItem.completed } // flips the completed var in new item
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        };
        const url = "http://localhost:3001/api/items/" + oldItem.id;
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        console.log(json);
    }
    catch (e) 
    {
        console.error(e)
    }
}

async function toggleCompleted(item, fetchAll)
{
    await patchCompletedStatus(item);
    console.log('toggle function firing')
    fetchAll(); 
}

async function sendDeleteRequest(item)
{
    try
    {
        const requestOptions = {
            method: 'DELETE',
        };
        const url = "http://localhost:3001/api/items/" + item.id;
        const response = await fetch(url, requestOptions);
        console.log(response);
    }
    catch (e) 
    {
        console.error(e)
    }
}

async function deleteItem(item, fetchAll)
{
    await sendDeleteRequest(item);
    console.log('deletion firing');
    await fetchAll(); 
}