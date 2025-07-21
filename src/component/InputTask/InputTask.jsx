import { useState, useEffect } from "react";
import StopWatch from "../StopWatch/stopWatch";
import "./InputTask.css";
import { TbClockEdit } from "react-icons/tb";
import { MdOutlineAutoDelete } from "react-icons/md";
const InputTask = () => {
  const [input, setInput] = useState("");
  const [time, setTime] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState("");
  const [taskPage, setTaskPage] = useState(true);
  const [editPage, setEditPage] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("Todo");
    if (stored) {
      setTodo(JSON.parse(stored));
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const newTodo = [...todo, { id: Date.now(), todoTask: input, time: time }];
    localStorage.setItem("Todo", JSON.stringify(newTodo));
    setTodo(newTodo);
    setTaskPage(false);
    setInput("");
    setTime("");
  };
  const inputTextHandler = (e) => {
    setInput(e.target.value);
  };
  const inputTimeHandler = (e) => {
    setTime(e.target.value);
  };
  const deleteTask = (taskId) => {
    setTodo((todo) => {
      return todo.filter((del) => {
        return del.id !== taskId;
      });
    });
    localStorage.setItem("Todo", JSON.stringify(todo));
  };
  const editTask = () => {
    setEditPage(false);
  };
  const editTime = (e) => {
    setEdit(e.target.value);
  };
  const editTodo = (id) => {
    console.log(id);
    setTodo(
      todo.map((tos) => {
        if (tos.id == id) {
          return { ...tos, time: edit };
        } else {
          return tos;
        }
      })
    );
    localStorage.setItem("Todo", JSON.stringify(todo));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setEditPage(true);
  };

  const AddTask = () => {
    setTaskPage(true);
  };

  return (
    <>
      <div className="inputWrapper ">
        {taskPage ? (
          <form onSubmit={submitHandler} className="inputForm">
            <div className=" mb-3">
              <input
                type="text"
                className="form-control taskInput border-0 border-bottom bg-transparent text-white"
                id="exampleInputEmail1"
                value={input}
                onChange={inputTextHandler}
                aria-describedby="emailHelp"
                placeholder="Name Your Task"
                required
              />
            </div>
            <div className="col-auto">
              <input
                type="number"
                className="form-control numberInput mb-3 border-0 border-bottom bg-transparent text-white"
                max={25}
                value={time}
                onChange={inputTimeHandler}
                id="validationTooltip01"
                placeholder="Specify Time for task in mins"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3 w-100">
              Submit
            </button>
          </form>
        ) : editPage ? (
          <div className="cardWrapper">
            <button className="btn btn-warning mb-3 w-100" onClick={AddTask}>
              Add Task
            </button>
            {todo.map((t) => {
              return (
                <div className="card rounded-0" key={t.id}>
                  <div className="card-body border border-0 ">
                    <div className="cardText">
                      <h4 className="card-title text-dark text-center m-0">
                        {t.todoTask}
                      </h4>
                    </div>
                    <h1 className="stopwatch">
                      <StopWatch countDown={t.time * 60 * 100} />
                    </h1>
                    <div className="cardButtons">
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        <MdOutlineAutoDelete size={20} />
                      </button>
                      <div className="modal" id="staticBackdrop" tabIndex="-1">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-body fs-5 text-danger pb-0">
                              <p>
                                This action will permanently remove this task,
                                do you want to go with this?
                              </p>
                            </div>
                            <div className="d-flex justify-content-end m-3 gap-3">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-outline-danger"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  deleteTask(t.id);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-outline-warning editButton "
                        onClick={() => editTask(t.id)}
                      >
                        <TbClockEdit size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleEditSubmit} className="inputForm">
            <div className="col-auto">
              <input
                type="number"
                className="form-control numberInput mb-3 border-0 border-bottom bg-transparent text-white"
                max={25}
                onChange={editTime}
                id="validationTooltip01"
                placeholder="Edit Time for task in mins"
                required
              />
            </div>
            <button type="submit" onClick={() => editTodo(t.id)} className="btn btn-primary mt-3 w-100">
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default InputTask;
