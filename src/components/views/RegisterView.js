import { Form } from "react-router-dom";

const LoginView = (props) => {
  const {handleSubmit, handleChange} = props;
  return (  
    <div id='register-view'>
      <h2> Register </h2>
      <form id='register-form' onSubmit={(e) => handleSubmit(e)}>
      <input type="text" id="email" placeholder='Email' onChange={(e) => handleChange(e)} required/>
        <input type='password' id='password' placeholder="Password" required />
        <button type="submit" >Register</button>
      </form>
      <script src="{{ url_for('static', filename='js/app.js') }}"></script>
    </div>
  );
};

export default LoginView;