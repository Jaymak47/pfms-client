import { useState } from "react";
import isioloLogo from "../components/images/isiolocountylogo.png";
import pfmsLogo from "../components/images/pfmsloginlogo.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FormInput from "../common/loginform";

import { Formik } from "formik";
import * as yup from "yup";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [user, setUser] = useState({ username: "", password: "" });
  const history = useHistory();

  const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const onChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (user.username === "") {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        // return "User Required";
      }
    }

    setValidated(true);
    // history.push("/homepage");
  };

  return (
    <div>
      <div className="loginbox">
        <div className=" login">
          <div>
            <img className="imgisiolologo" src={isioloLogo} alt="Isiolo Logo" />
          </div>
          <div>
            <img src={pfmsLogo} alt="pfms Logo" />
          </div>
          <div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="m-3">
                <FormInput
                  required
                  value={user.username}
                  onChange={onChangeUser}
                  name="username"
                  id={user.username}
                  type="text"
                  placeholder="Username"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </Row>
              <Row className="m-3">
                <FormInput
                  required
                  value={user.password}
                  onChange={onChangeUser}
                  name="password"
                  id={user.password}
                  type="password"
                  placeholder="Password"
                />
                <Form.Control.Feedback>Invalid Password</Form.Control.Feedback>
                <InputGroup hasValidation>
                  <InputGroup.Text>@</InputGroup.Text>
                  <Form.Control type="text" required isInvalid />
                  <Form.Control.Feedback type="invalid">
                    Please choose a username.
                  </Form.Control.Feedback>
                </InputGroup>
              </Row>
              <Row className="m-4">
                <Button variant="warning" type="submit">
                  <strong>Login</strong>
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
