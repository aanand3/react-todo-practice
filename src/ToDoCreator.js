import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class ToDoCreator extends Component
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

    async handleSubmit(event)
    {
        event.preventDefault();
        console.log('new item submitted');

        // post the new item text and then get all items
        await this.postItem(this.state.userInput);
        await this.props.fetchAllItems(); 
        this.setState({userInput: ""})
    }

    handleChange(event)
    {
        this.setState({ userInput: event.target.value })
    }

    async postItem(inputText)
    {
        try
        {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({completed: false, content: inputText})
            };
            const url = "http://localhost:3001/api/items/";
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
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    value={this.state.userInput}
                    onChange={this.handleChange}
                    autoFocus />
                <button type="submit">Add Item</button>
            </form>
        )
    }
}

ToDoCreator.propTypes = {
    fetchAllItems: PropTypes.func,
}

export default ToDoCreator
