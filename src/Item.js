import PropTypes from 'prop-types'
import React, { Component } from 'react'
import UpdateItem from './UpdateItem'

export class Item extends Component
{

    constructor(props)
    {
        super(props)

        this.state = {
            itemIsBeingEdited: false,
        }
    }


    async patchCompletedStatus(oldItem) 
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

    async toggleCompleted(item, fetchAll)
    {
        await this.patchCompletedStatus(item);
        console.log('toggle function firing')
        this.props.fetchAllItems();
    }

    async sendDeleteRequest(item)
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

    async deleteItem(item, fetchAll)
    {
        await this.sendDeleteRequest(item);
        console.log('deletion firing');
        await this.props.fetchAllItems();
    }

    toggleEdit()
    {
        this.setState({ itemIsBeingEdited: !this.state.itemIsBeingEdited })
        console.log('toggle edit mode')
    }

    render()
    {
        if (this.state.itemIsBeingEdited) // then show the update prompt
        {
            return (
                <li >
                    <UpdateItem toggleEdit={this.toggleEdit.bind(this)} 
                                fetchAllItems = {this.props.fetchAllItems}
                                item = {this.props.item} />
                </li>
            )
        }
        
        else 
        {
            return (
                <li >
                    <input
                        type="checkbox"
                        checked={this.props.item.completed}
                        onChange={() => this.toggleCompleted(this.props.item, this.props.fetchAllItems)}
                    />

                    {(this.props.item.completed) ?
                        <del>{this.props.item.content}</del> :
                        <span>{this.props.item.content}</span>}

                    <button onClick={() => this.toggleEdit()}>Edit</button>
                    <button onClick={() => this.deleteItem(this.props.item, this.props.fetchAllItems)}>Delete</button>
                </li>
            )
        }
    }
}

export default Item

Item.propTypes = {
    item: PropTypes.object,
    fetchAllItems: PropTypes.func,
}


