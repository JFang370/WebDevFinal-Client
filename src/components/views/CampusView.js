/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, students} = props;
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      {
        campus.imgUrl ?
        <div><img src={campus.imgUrl} alt="" height="500px" width="1000px"></img></div>
        :
        <div><img src="https://ccrc.tc.columbia.edu/media/k2/attachments/2021/08/09/teachers-college-exterior.jpg" alt="" height="500px" width="1000px"></img></div>
      }
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <Link to={`/edit-campus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>
      <Link to={'/campuses'}>
        <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>
    <div>
      {
        campus.students.length === 0 ?
        <div><h1>There are no students currently enrolled at this campus</h1></div>
        :
        <div>
          <h1>Enrolled Students:</h1>
          {campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <Link to={`/edit-student/${student.id}`}>
                <button>Edit Student</button>
              </Link>
              <Link to={`/remove-confirm/${student.id}`}>
                <button>Remove Student</button>
              </Link>
            </div>
        );
      })}
        </div>
      }
      </div>
      <div>
        {
          students.map.length === 0 ?
          <div>There are no students to add</div>
          :
          <div>
              <h1>Add an existing student:</h1>
              {students.map((student) => {
              let name = student.firstname + " " + student.lastname;
              return (
                <div>
                  {
                    student.campus.id === campus.id ? 
                    <div></div>
                    :
                    <div><Link to={`/student/${student.id}`}>
                      <h2>{name}</h2>
                      </Link>
                      <Link to={`/campus/${campus.id}/add-student/${student.id}`}>
                      <button>Add</button>
                      </Link>
                      <hr/>
                    </div>    
                }
              </div>
            );
          })}
          </div>
        }
      </div>
      <Link to={`/new-student/${campus.id}`}>
        <button>Add New Student</button>
      </Link>
    </div>
  );
};

export default CampusView;