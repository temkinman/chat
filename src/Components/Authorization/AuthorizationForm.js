import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import SignUp from "./SignUp";
import Login from "./Login";
import './Authorization.css'

const Authorization = () => {
  const [key, setKey] = useState("login");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="test"
    >
      <Tab eventKey="login" title="Login">
        <Login />
      </Tab>
      <Tab eventKey="sign up" title="Sign up">
        <SignUp />
      </Tab>
    </Tabs>
  );
};

export default Authorization;
