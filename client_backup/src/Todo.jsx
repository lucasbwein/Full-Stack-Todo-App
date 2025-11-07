// import { put } from "../../server/routes"; This is prob not needed
import { motion } from "framer-motion";


export default function Todo(props) {
    const { todo, setTodos, moveDown, moveUp, total, index } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });
    

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodos) => {
                    if (currentTodos._id === todoId) {
                        return { ...currentTodos, status: !currentTodos.status };
                    }
                    return currentTodos;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                .filter((currentTodos) => (currentTodos._id !== todoId));
            })
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 12 }} // y=amount moved, y: 12  , rotate: -5 
            animate={{ opacity: 1,  y: 0,
                boxShadow: todo.status ? [ // adds glow to finished tasks
                    "0 0 0 rgba(34, 197, 94, 0)", "0 0 15px rgba(34,197,94,0.4)",
                    "0 0 0 rgba(34, 197, 94, 0)"
                 ] : "0 0 0 rgba(0,0,0,0)",

                // rotate: 0, // resets rotate so its not always rotated
            }} 
            exit={{ opacity: 0, y: -12}} // y=amount moved,  y: -12, rotate: 5 
            transition={{  
                boxShadow: { duration: 0.9, ease: "easeOut" }, // makes green pulse longer
                opacity: { duration: 0.2, ease: "easeInOut" } // helps transition
            }}
            className="todo"
        >
            <p>{todo.todo}</p>
            <div className="todo__right">
                <div className="todo__arrows">
                    <button
                        className="todo__arrow" onClick={() => moveUp(index)} disabled={index === 0}
                        aria-label="Move up" title="Move up"
                    >▲</button>
                    <button
                        className="todo__arrow" onClick={() => moveDown(index)} disabled={index === total - 1}
                        aria-label="Move down" title="Move down"
                    >▼</button>
                </div>

                {/* MOVE todo.todo here to put arrows in front */}
                <div className="mutations">
                    <button className="todo__status"
                        onClick={() => updateTodo(todo._id, todo.status)}
                    >
                        {(todo.status) ? "☑" : "☐"}
                    </button>
                    <button
                        className="todo__delete"
                        onClick={() => deleteTodo(todo._id)}
                    >🗑️</button>
                </div>
            </div>
            {/* Added for priority adding move to below <todo.todo> to change location */}
            <span className={`priority priority--${todo.priority || "medium"}`}>
                {todo.priority || "medium"}
            </span>
        </motion.div>
    )
}