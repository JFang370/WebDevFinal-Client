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
import { addStudentThunk, fetchCampusThunk } from '../../store/thunks';

import NewCampusStudentView from '../views/NewCampusStudentView';

class NewStudentToCampusContainer extends Component {
  //Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: false,
      redirectId: null
    };
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id)
  }

  async validateInput(event){
    var letters = /^[A-Za-z]+$/;

    if (event.target.name === "firstname")
      if(!event.target.value.match(letters)){
        alert("Invalid first name!");
        return false;
      }
    else if (event.target.name === "lastname")
      if(!event.target.value.match(letters)){
        alert("Invalid last name!");
        return false;
      }
    else if (event.target.name === "imageUrl") 
      if(!event.target.value.match(/\.(jpeg|jpg|gif|png)$/)){
        alert("Invalid image url!");
        return false;
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

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      campusId: this.props.campus.id,
      email: this.state.email,
      imageUrl: this.state.imageUrl === null ? "" : this.state.imageUrl,
      gpa: this.state.gpa
    };

    // Edit student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the edited student
    this.setState({
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: true, 
      redirectId: newStudent.id
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
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewCampusStudentView 
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
        addStudent: (student) => dispatch(addStudentThunk(student)),
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewStudentToCampusContainer);