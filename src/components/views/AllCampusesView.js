/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const {deleteCampus} = props;
  // If there is no campus, display a message.

  
  if (!props.allCampuses.length) {
    return (
      <div>
        <p>There are no currently no campuses</p>  
        <Link to={'/new-campus'}>
          <button>Add New Campus</button>
        </Link>
      </div>
    
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      {props.allCampuses.map((campus) => (    
        <div key={campus.id}>
          {
          campus.id === "0" ?
          <div></div>
          :
          <div>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <img src={!campus.imageURL ? "https://ccrc.tc.columbia.edu/media/k2/attachments/2021/08/09/teachers-college-exterior.jpg":campus.imageURL} height="500px" width="1000" alt='campus image'></img>
          <h4>campus id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <Link to={`/edit-campus/${campus.id}`}>
              <button>Edit</button>
          </Link>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <hr/>
          </div>
        }
        </div>
      ))}
      <br/>
      <Link to={`/new-campus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;