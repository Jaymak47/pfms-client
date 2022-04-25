import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { STAFF_LOGIN } from "../graphql/mutations";
import { Row, Col, Form, Button } from "react-bootstrap";
import isioloLogo from "../components/images/isiolocountylogo.png";

import { FormControl } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router";
import { useForm } from "../utils/hooks";
import NavBarMainLogin from "./NavbarMainLogin";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [netErrors, setNetErrors] = useState("");
  const history = useHistory();

  const { onChange, onSubmit, values, validated, setValues } = useForm(
    loginStaff,
    {
      username: "",
      password: "",
    }
  );

  let err = "";
  const [login, { loading }] = useMutation(STAFF_LOGIN, {
    update(_, { data: { login: userdata } }) {
      context.login(userdata);
      history.push("/dashboard");
      window.location.reload();
    },
    onError({ graphQLErrors, networkError }) {
      if (networkError) {
        err = "Error connecting to System Server contact Administrator";
        setNetErrors(err);
        return;
      }
      if (graphQLErrors) {
        err = graphQLErrors[0].extensions.exception.errors;
        setErrors(err);
        return;
      }
    },

    variables: values,
  });

  function loginStaff() {
    login();
  }

  function handleClick() {
    setValues({
      username: "",
      password: "",
    });
  }

  //DESTRUCTURE FIELDS
  const { username, password } = values;
  return (
    <div>
      <Row className="m-3">
        <NavBarMainLogin />
      </Row>
      <Row className="m-10">
        <div className="loginbox">
          <div className=" login">
            <h1>Welcome to :</h1>
            <Col>
              <img src={isioloLogo} alt="Isiolo Logo" />
            </Col>

            <div>
              <Form
                noValidate
                validated={validated}
                onSubmit={onSubmit}
                className={loading ? "loading" : ""}
              >
                <Row className="m-3">
                  <Form.Group as={Col} md="12">
                    <InputGroup>
                      <FormControl
                        required
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="12">
                    <InputGroup>
                      <FormControl
                        required
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="m-3">
                  <Form.Group as={Col} md="12">
                    <Button
                      onClick={handleClick}
                      variant="secondary"
                      className="mx-3"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="success">
                      Submit
                    </Button>
                  </Form.Group>
                </Row>
              </Form>
              {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                  <ul className="list">
                    {Object.values(errors).map((value) => (
                      <li key={value}>{value}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={netErrors ? "ui error message" : null}>
                {netErrors ? netErrors : null}
              </div>
            </div>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default Login;
