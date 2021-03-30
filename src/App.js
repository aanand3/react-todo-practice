import logo from './logo.svg';
import './App.css';
import Items from './Items.js';
import ToDoCreator from './ToDoCreator.js'
import React, { Component } from 'react'

export class App extends Component
{
  constructor(props)
  {
    super(props)

    this.state = {
      items: [],
    }
  }

  // runs on startup
  componentDidMount()
  {
    this.fetchAllItems();
  }

  // to fetch/update the list
  async fetchAllItems()
  {
    try
    {
      const url = "http://localhost:3001/api/items";
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      this.setState({items: json})
    }
    catch (e) 
    {
      console.error(e)
    }
  }

  render()
  {
    return (
      <div className="App">
        <header className="App-header">
          <ToDoCreator fetchAllItems = {this.fetchAllItems.bind(this)}/> 

          <img src={logo} className="App-logo" alt="logo" />

          <Items items = {this.state.items} 
                 fetchAllItems = {this.fetchAllItems.bind(this)} />

        </header>
      </div>
    )
  }
}



export default App;
