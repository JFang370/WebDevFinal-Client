/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      id: "", 
      name: "", 
      address: "",
      imageUrl: "",
      description: "",
      redirect: false,
      redirectId: null,
    };
  }

  async validateInput(event){
    var letters = /^[A-Za-z ]+$/;
    var numbers = /^[0-9]+$/;
    var invalidSpecialChar = /^[!@#$%^&*()_+`~=]+$/;
    if (event.target.name === "name")
      if(!event.target.value.match(letters)){
        alert("Invalid campus name!");
        return false;
      }
    else if (event.target.name === "address")
      if(event.target.value.match(invalidSpecialChar)){
        alert("Invalid address!");
        return false;
      }
    else if (event.target.name === "imageUrl") 
      if(!event.target.value.match(/\.(jpeg|jpg|gif|png)$/)){
        alert("Invalid image url!");
        return false;
      }
    else if (event.target.name === "campusId"){
      if(!event.target.value.match(numbers)){
        alert("Invalid campus ID");
        return false;
      }
    }
    else
      return true; 
  }

  // Capture input data when it is entered
  handleChange = event => {
    if(this.validateInput(event)){
      this.setState({[event.target.name]: event.target.value})
    }
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
        id: this.state.id,
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl
    };
    
    // Add new student in back-end database
    await this.props.addCampus(campus);

    // Update state, and trigger redirect to show the new student
    this.setState({
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  render() {
    // Redirect to all campus page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campuses`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}      
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}
 
// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(null, mapDispatch)(NewCampusContainer));