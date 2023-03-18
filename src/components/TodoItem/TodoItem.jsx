import { useDispatch } from "react-redux"
import { removeTodo, toggleTodoComplete } from "../../store/todoSlice"


const TodoItem = ({ completed, id, text }) => {
	const dispatch = useDispatch();
	return (
		<li className='list-item'>
			<input type="checkbox" onChange={() => dispatch(toggleTodoComplete({ id }))}
				checked={completed} style={{ cursor: 'pointer' }} />
			<span>{text}</span>
			<span onClick={() => dispatch(removeTodo({ id }))} style={{ color: 'tomato', fontSize: '24px', cursor: 'pointer' }}>&times;</span>
		</li>
	)
}

export default TodoItem