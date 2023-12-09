/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from "react-router-dom";

const StudentView = (props) => 
{
  const {student, deleteStudent} = props;
  // Render a single Student view 
  let campusDisplayMessage;
  let studentImage;
  // Render a single Campus view with list of its students
  
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={!student.imageURL ? "https://m.media-amazon.com/images/I/41OY4eExh+L._AC_.jpg":student.imageURL} height="500px" width="500" alt='campus image'></img>
      <div>email: {student.email + " GPA: " + student.gpa }</div>
      {student.campus.id}
      <div key={student.campus.id}>
        {
          student.campus.id === "0" ? 
          <h1>Not enrolled in any campus.</h1>
          :
          <h3><Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link></h3>
        }

      </div>
      <Link to={`/edit-student/${student.id}`}>
        <button>Edit</button>
      </Link>
      <Link to={'/students'}>
      <button onClick={() => deleteStudent(student.id)}>Delete Student</button>
      </Link>
              
    </div>
  );

};

export default StudentView;