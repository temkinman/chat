import React, { useState } from "react";
import { Button, Form, Col } from "react-bootstrap";

const SignUp = () => {
  const handleSubmit = () => {
    console.log("YESS");
  };
  const [userName] = useState(true);

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="formUserName">
          <Form.Label>
            Username{" "}
            <span className="required">
              {userName ? "* Username in use. Use a different username" : "*"}
            </span>
          </Form.Label>
          <Form.Control
            className="field__control"
            // onChange={(v) => setJob(v.currentTarget.value.trim())}
            placeholder="Username"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formPassword">
          <Form.Label>
            Password <span className="required">*</span>
          </Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="formConfirmPassword">
          <Form.Label>
            Confirm password <span className="required">*</span>
          </Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Form.Row>
      <div className="btn-custom">
        <Button variant="success" type="submit" className="btn-authorization">
          Registration
        </Button>
      </div>
    </Form>
  );
};

export default SignUp;
