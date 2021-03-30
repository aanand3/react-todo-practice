import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class UpdateItem extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            userInput: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        this.setState({userInput: event.target.value})
    }

    async handleSubmit(event) 
    {
        event.preventDefault();
        console.log('saving...');

        // post the new item text and then get all items
        await this.patchContent(this.props.item);
        await this.props.fetchAllItems(); 
        this.props.toggleEdit(); 
    }

    async patchContent(item) 
    {
        try
        {
            const newContent = { content: this.state.userInput } // flips the completed var in new item
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContent)
            };
            const url = "http://localhost:3001/api/items/" + item.id;
            const response = await fetch(url, requestOptions);
            const json = await response.json();
            console.log(json);
        }
        catch (e) 
        {
            console.error(e)
        }
    }

    render()
    {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                        value={this.state.userInput}
                        onChange={this.handleChange}
                        autoFocus />

                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

UpdateItem.propTypes = {
    item: PropTypes.object,
    fetchAllItems: PropTypes.func,
    toggleEdit: PropTypes.func,
}

export default UpdateItem

