import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer
} from './components/containers';

import AddStudentConfirmContainer from "./components/containers/AddStudentConfirmContainer";
import RemoveStudentConfirmContainer from "./components/containers/RemoveStudentConfirmContainer";
import NewCampusStudentContainer from "./components/containers/NewCampusStudentContainer";
import NewCampusContainer from "./components/containers/NewCampusContainer";
import EditCampusContainer from "./components/containers/EditCampusContainer";
import EditStudentContainer from "./components/containers/EditStudentContainer";
// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/new-campus" component={NewCampusContainer} />
        <Route exact path="/edit-campus/:id" component={EditCampusContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/campus/:campusid/add-student/:studentid" component={AddStudentConfirmContainer}/>
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/new-student" component={NewStudentContainer} />
        <Route exact path="/new-student/:id" component={NewCampusStudentContainer} />
        <Route exact path='/edit-student/:id' component={EditStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />
        <Route exact path="/remove-confirm/:id" component={RemoveStudentConfirmContainer} />
      </Switch>        
    </div>
  );
}

export default App;