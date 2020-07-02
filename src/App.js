import React, { Component } from 'react';
import logo from './logo.svg';
import Menu  from './components/MenuComponent.js';
import { Navbar, NavbarBrand } from 'reactstrap';
import './App.css';
import { DISHES } from './shared/dishes.js';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      dishes : DISHES,
    }
  }
  render() { return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand className="text-white" href="/">Restorante Con Fusion</NavbarBrand>  
          </div> 
        </Navbar>
        <Menu dishes= {this.state.dishes} />
      </div>
    );
  }
}

export default App;
