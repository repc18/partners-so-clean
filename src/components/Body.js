import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./header/Header";
import TextInput from "./input/TextInput";
import OrderList from "./OrdersList/OrdersList";

export default function Body() {
  const [finishedOrder, setFinishedOrder] = useState([]);
  const [unfinishedOrder, setUnfinishedOrder] = useState([]);
  const [id, setId] = useState("");
  const finishUrl =
    "https://soclean-backend.herokuapp.com/api/worker/get_finished_order";
  const unfinishUrl =
    "https://soclean-backend.herokuapp.com/api/worker/get_unfinished_order";

  function idChangeHandler(idInput) {
    setId(idInput);
  }

  async function getOrders(idInput) {
    console.log(idInput);
    try {
      const finishOrder = await axios.post(finishUrl, {
        workerId: idInput,
      });
      const unfinishOrder = await axios.post(unfinishUrl, {
        workerId: idInput,
      });
      setFinishedOrder(finishOrder.data.orders);
      setUnfinishedOrder(unfinishOrder.data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrders(id);
  }, [id]);

  return (
    <div>
      <Header />
      <TextInput setId={idChangeHandler} />
      <OrderList title="Finished Order" orders={finishedOrder} />
      <OrderList title="Unfinished Order" orders={unfinishedOrder} />
    </div>
  );
}
