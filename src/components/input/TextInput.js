import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "../UI/Card";
import "./TextInput.css";

export default function TextInput(props) {
  const [id, setId] = useState("");

  function changeHandler(event) {
    setId(event.target.value);
  }

  function fetchOrders() {
    props.setId(id);
  }

  return (
    <Card className="text-input">
      <TextField
        id="standard-basic"
        label="Your ID"
        onChange={changeHandler}
        value={id}
      />
      <Button variant="contained" color="primary" onClick={fetchOrders}>
        Get my Orders
      </Button>
    </Card>
  );
}
