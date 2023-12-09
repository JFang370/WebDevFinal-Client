/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";

import EditCampusView from '../views/EditCampusView';

class EditCampusContainer extends Component {
  //Initialize state
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

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id)

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
      id: this.state.id === "" ? this.props.campus.id : this.state.id,
      name: this.state.name === "" ? this.props.campus.name : this.state.name,
      address: this.state.address === "" ? this.props.campus.address : this.state.address,
      imageUrl: this.state.imageUrl === "" ? this.props.campus.imageUrl : this.state.imageUrl,
      description: this.state.description === "" ? this.props.campus.description : this.state.description,
    };

    // Edit student in back-end database
    await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the edited student
    this.setState({
      id: "",
      name: "", 
      address: "", 
      description: "",
      imageUrl: "",
      redirect: true, 
      redirectId: this.props.campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "student"
  };
};

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);