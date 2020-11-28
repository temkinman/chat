import React, { useState } from "react";
import {
  Button,
  Form,
  Col,
} from "react-bootstrap";

const Login = () => {
  const [isExistUser, setIsExistUser] = useState(true);
  const [user, setUser] = useState("");

  const users = {
    admin: "admin",
    user: "12345678",
  };

  const onChangeInputHandle = (event) => {
    setIsExistUser(true);
    const name = event.currentTarget.name;
    if (name === "userName") {
      const userName = event.currentTarget.value;
      setUser({ [userName]: "" });
    }
    if (name === "userPassword") {
      const userPassword = event.currentTarget.value;
      setUser({ [Object.keys(user)[0]]: userPassword });
    }
  };

  const handleSubmit = (event) => {
    const name = Object.keys(user)[0];
    const password = user[name];

    if (users.hasOwnProperty(name) && users[name] === password) {
      setIsExistUser(true);
    } else {
      setIsExistUser(false);
    }
    event.preventDefault();
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formUserName">
          <Form.Label>
            Username{" "}
            <span className="required">
              {isExistUser ? "*" : "* incorrect username or password"}
            </span>
          </Form.Label>
          <Form.Control
            className="field__control"
            name="userName"
            onChange={(e) => onChangeInputHandle(e)}
            placeholder="Username"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>Password <span className="required">*</span></Form.Label>
          <Form.Control
            name="userPassword"
            type="password"
            placeholder="Password"
            onChange={(e) => onChangeInputHandle(e)}
          />
        </Form.Group>
      </Form.Row>
      <div className="btn-custom">
        <Button variant="success" type="submit" className="btn-authorization">
          Login
        </Button>
      </div>
    </Form>
  );
};

export default Login;
