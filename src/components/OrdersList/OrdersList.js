import "./OrdersList.css";
import Card from "../UI/Card";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import axios from "axios";

const style = {
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function OrdersList(props) {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const confirmOrderUrl =
    "https://soclean-backend.herokuapp.com/api/complete_order";

  const classes = useStyles();

  const body = (
    <Card styles={style} className={classes.paper}>
      <h2 id="simple-modal-title">Order Confirmation</h2>
      <p id="simple-modal-description">Confirm Order Completition?</p>
      <Button
        className="modal-button"
        variant="contained"
        color="primary"
        onClick={confirmOrder}
      >
        Confirm
      </Button>
      <Button
        className="modal-button"
        variant="contained"
        color="secondary"
        onClick={handleClose}
      >
        Cancel
      </Button>
    </Card>
  );

  async function confirmOrder() {
    try {
      const confirmedOrder = await axios.post(confirmOrderUrl, {
        orderId: id,
      });
      setOpen(false);
      window.location.reload(false);
      alert("Order Finished!");
      console.log(confirmedOrder.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    console.log("Close");
    setOpen(false);
  }

  function rowClickHandler(id) {
    console.log(id.$oid);
    handleOpen();
    setId(id.$oid);
  }

  function renderTableData() {
    return props.orders.map((order, index) => {
      const {
        _id,
        customerName,
        customerPhone,
        area,
        address,
        date,
        shift,
        price,
      } = order;
      return (
        <tr onClick={() => rowClickHandler(_id)} key={index + 1}>
          <td>{index + 1}</td>
          <td>{customerName}</td>
          <td>{customerPhone}</td>
          <td>{area}</td>
          <td>{address}</td>
          <td>{date}</td>
          <td>{shift[0]}</td>
          <td>{shift[shift.length - 1]}</td>
          <td>{price}</td>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            {body}
          </Modal>
        </tr>
      );
    });
  }

  return (
    <div>
      <Card className="orders">
        <table className="table table-hover table-responsive table-light caption-top">
          <caption>{props.title}</caption>
          <thead>
            <th scope="col">#</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Customer Phone</th>
            <th scope="col">Customer Area</th>
            <th scope="col">Customer Address</th>
            <th scope="col">Date</th>
            <th scope="col">Starting Hour</th>
            <th scope="col">Ending Hour</th>
            <th scope="col">Price</th>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </Card>
    </div>
  );
}
