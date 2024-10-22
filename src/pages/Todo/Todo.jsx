import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchTodos } from "../../Data/todos";

import "./Todo.css";
import { Form } from "react-bootstrap";

function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  // filters
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // todos
  const [todos, setTodos] = useState([]);
  // display

  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  useEffect(() => {
    // setCurPage( (prev) => ( prev > numPages ? numPages : prev))
    setCurPage(1);
  }, [numPages]);

  useEffect(() => {
    console.log(`curPage: ${curPage}`);
  }, [curPage]);

  useEffect(() => {
    console.log(`itemsPerPage: ${itemsPerPage}`);
    setNumPages(Math.ceil(todosRaw.length / itemsPerPage));
  }, [itemsPerPage, todosRaw]);

  useEffect(() => {
    console.log(`onlyWaiting: ${onlyWaiting}`);
  }, [onlyWaiting]);

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setCurPage(1);
  }, []); //load, fetch todos

  useEffect(() => {
    if (onlyWaiting) {
      //show only waiting
      setTodos(
        todosRaw.filter((todo) => {
         return !todo.completed;
        })
      );
    } else {
      //show all
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting, itemsPerPage]);

  // setTodos(todosRaw)}, [todosRaw, onlyWaiting])

  // console.log(todosRaw.length)

  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }
  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id);
    todoSelected.completed = true;
    // setTodosRaw(todosRaw)
    setTodos([...todosRaw]);
  }

  function addClick(id, title) {
    const newItem = {
      id,
      title,
      completed: false,
      userId: 1,
    };
    setTodosRaw([...todosRaw, newItem]);
  }

  // handle modal
  const [show, setShow] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        {/* Header */}
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            <span className="bi bi-plus"> Add Todo</span>{" "}
          </Modal.Title>
        </Modal.Header>

        {/* body */}
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={
                  Number(
                    todosRaw.reduce(
                      (prev, todo) => (todo.id > prev ? todo.id : prev),
                      0
                    )
                  ) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* footer */}
        <Modal.Footer>
          <Button variant="btn btn-outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="btn btn-outline-success"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title cannot be empty");
                newTitleRef.current.value = "";
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------filter -----*/}
      <div className="todo-filter-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onClick={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
          />

          <label class="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only &nbsp;&nbsp;
            <button className="btn btn-warning">
              Waiting &nbsp;
              <span className="bi-clock-history"></span>
            </button>
          </label>
        </div>

        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
        >
          <option value={5} selected>
            5 item per menu
          </option>
          <option value={10}>10 item per menu</option>
          <option value={50}>50 item per menu</option>
          <option value={100}>100 item per menu</option>
        </select>
      </div>

      {/* -------table--------- */}
      <table className="table table-Light table-striped">
        <thead className="table-success">
          <tr>
            <th style={{ width: "10%" }}>ID</th>
            <th>title</th>
            <th style={{ textAlign: "right" }}>
              completed &nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage - 1;
              return index >= min && index <= max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td>
                    <span
                      className="badge bg-success"
                      style={{ width: "2rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }}>{todo.title}</td>
                  <td style={{ textAlign: "right" }}>
                    {todo.completed ? (
                      <span className="badge bg-success">
                        Done &nbsp;
                        <span className="bi bi-check-circle-fill"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        Waiting &nbsp;
                        <span className="bi-clock-history"></span>
                      </button>
                    )}
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash3"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* ---------page control-------- */}

      <div className="todo-page-control">
        {/* First */}
        <button
          className="btn btn-outline-success"
          onClick={() => {
            setCurPage(1);
          }}
          disabled={curPage === 1}
        >
          First
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage === 1}
        >
          Previous
        </button>

        <span>
          {curPage} &nbsp; / &nbsp; {numPages}
        </span>

        <button
          className="btn btn-outline-success"
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage === numPages}
        >
          Next
        </button>

        <button
          className="btn btn-outline-success"
          onClick={() => {
            setCurPage(numPages);
          }}
          disabled={curPage === numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
{
  /* <td style={{ textAlign: "left" }}>{todo.title}</td>
                  <td style={{ textAlign: "right" }}>
                    <span
                      className={
                        "badge " +
                        (todo.completed ? "bg-success" : "bg-warning")
                      }
                    >
                      {todo.completed ? "Done " : "Waiting"}
                      &nbsp;&nbsp;
                      <span
                        className={
                          "bi" +
                          (todo.completed
                            ? " bi bi-check-circle-fill"
                            : " bi-clock-history")
                        }
                      ></span>
                    </span> */
}
