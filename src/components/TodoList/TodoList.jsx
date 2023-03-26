import TodoItem from "../TodoItem/TodoItem"
import { useSelector } from "react-redux"

const TodoList = () => {
	const { todos, status, error } = useSelector(state => state.todos)

	return (
		<>
			{status === 'loading' && <h2>Loading</h2>}
			{error && <h2>An error occured: {error}</h2>}

			<ul className='list'>
				{
					todos.map(todo => <TodoItem key={todo.id} {...todo}
					/>)
				}
			</ul>
		</>

	)
}

export default TodoList