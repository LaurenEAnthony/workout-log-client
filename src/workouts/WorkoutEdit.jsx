import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const WorkoutEdit = (props) => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.description);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.result);

  const workoutUpdate = (event, workout) => {
    event.preventDefault();
    fetch(`http://localhost:3000/api/log/${props.workoutToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: editDesc,
        definition: editDef,
        result: editRes,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: props.token,
      },
    }).then((res) => {
      props.fetchWorkouts();
      props.updateOff();
    });
  };

  return (
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor="result" />
            <Input
              name="result"
              value={editRes}
              onChange={(e) => setEditRes(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description" />
            <Input
              name="description"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="definition" />
            <Input
              type="select"
              name="definition"
              value={editDef}
              onChange={(e) => setEditDef(e.target.value)}
            >
              <option value="Time">Time</option>
              <option value="Weight">Weight</option>
              <option value="Distance">Distance</option>
            </Input>
          </FormGroup>
          <Button type="submit">Update the workout!</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default WorkoutEdit;
