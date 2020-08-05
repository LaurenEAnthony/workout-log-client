import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [passwordhash, setPasswordhash] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password);
    fetch("http://localhost:3000/api/user", {
      method: "POST",
      body: JSON.stringify({ username: username, passwordhash: passwordhash }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.updateToken(data.sessionToken);
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPasswordhash(e.target.value)}
            name="password"
            value={passwordhash}
          />
        </FormGroup>
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;
