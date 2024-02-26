/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import React, { Component } from "react";
import RegisterView from "../views/RegisterView";

class RegisterContainer extends Component {
  // Get the specific campus data from back-end database
  
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  registerUser(newUser){
    const email = newUser.email
    const password = newUser.password
    fetch('/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email, password}),
    })
    .then(res => res.json())
    .then(data => alert(data.message))

  } 

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value})    
  }

  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    let newUser = {
      email: this.state.email,
      password: this.state.password
    }
    this.registerUser(newUser)
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    return (
      <div>
        <RegisterView handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".

// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default RegisterContainer;