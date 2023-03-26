import { useDispatch } from "react-redux"
import { deleteTodo, toggleCompleted } from "../../store/todoSlice"


const TodoItem = ({ completed, title, id }) => {
	const dispatch = useDispatch();
	return (
		<li className='list-item'>
			<input type="checkbox" onChange={() => dispatch(toggleCompleted(id))}
				checked={completed} style={{ cursor: 'pointer' }} />
			<span>{title}</span>
			<span onClick={() => dispatch(deleteTodo(id))} style={{ color: 'tomato', fontSize: '24px', cursor: 'pointer' }}>&times;</span>
		</li>
	)
}

export default TodoItem