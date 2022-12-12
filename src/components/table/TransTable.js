import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { deleteTrans } from "../../utils/axiosHelper";

export const TransTable = ({ trans, getTrans }) => {
  const [itemToDelete, setItemToDelete] = useState([]);
  // const [deleteAll, setDeleteAll] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const total = trans.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + amount : acc - amount,
    0
  );
  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setItemToDelete([...itemToDelete, value]);
      setIsAllSelected(trans.length === itemToDelete.length + 1);
    } else {
      const arg = itemToDelete.filter((item) => item !== value);
      setItemToDelete(arg);
      setIsAllSelected(false);
    }
  };
  const handleOnDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${itemToDelete.length} transactions?`
      )
    ) {
      const { status } = await deleteTrans(itemToDelete);
      if (status === "success") {
        setItemToDelete([]);
        getTrans();
      }
    } else {
      return;
    }
  };
  const handleOnSelectAll = (e) => {
    const { checked } = e.target;

    if (!checked) {
      setItemToDelete([]);

      setIsAllSelected(false);
    } else {
      const tempid = trans.map((item) => item._id);
      setItemToDelete(tempid);
      setIsAllSelected(true);
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                type="checkbox"
                onChange={handleOnSelectAll}
                checked={isAllSelected}
                //checked={trans.length === itemToDelete.length ? true : false}
              ></Form.Check>
            </th>
            <th>Date</th>
            <th>Transaction</th>
            <th>Income</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          {trans.map((item, i) => (
            <tr key={item._id}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={handleOnSelect}
                  value={item._id}
                  checked={itemToDelete.includes(item._id)}
                ></Form.Check>
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>

              <td>{item.name}</td>
              {item.type === "income" ? (
                <>
                  <td>$ {item.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  <td></td>
                  <td className="text-danger">-$ {item.amount}</td>
                </>
              )}
            </tr>
          ))}

          <tr className="fw-bolder">
            <td colSpan={3}>Total balance</td>
            <td>${total}</td>
          </tr>
        </tbody>
      </Table>
      {itemToDelete.length ? (
        <div className="d-grid">
          <Button variant=" danger" onClick={handleOnDelete}>
            Delete {itemToDelete.length} item(s)
          </Button>
        </div>
      ) : null}
    </>
  );
};
