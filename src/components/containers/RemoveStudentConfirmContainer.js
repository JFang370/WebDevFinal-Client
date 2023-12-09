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
import { fetchStudentThunk, editStudentThunk } from "../../store/thunks";

import RemoveStudentConfirmView from '../views/RemoveStudentConfirmView';

class RemoveStudentConfirmContainer extends Component {
  //Initialize state
  constructor(props){
    super(props);
    this.state = {
      id: null,
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: false,
      redirectId: null,
      campuses: []
    };
  }

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id)
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.
    let student = {
      id: this.props.student.id,
      firstname: this.props.student.firstname,
      lastname: this.props.student.lastname,
      campusId: "0",
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
    };
    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the edited student
    this.setState({
      id: null,
      firstname: "", 
      lastname: "", 
      campusId: null,
      email: "",
      imageUrl: "",
      gpa: null,
      redirect: true, 
      redirectId: this.props.student.campusId
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null, campuses: []});
  }

  // Render new student input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <RemoveStudentConfirmView 
          handleChange={this.handleChange} 
          handleSubmit={this.handleSubmit}
          student={this.props.student}
          campusList={this.state.campuses}
        />
      </div>          
    );
  }
}

const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
    allCampuses: state.allCampuses,  // Get the State object from Reducer "student"
  };
};

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(RemoveStudentConfirmContainer);