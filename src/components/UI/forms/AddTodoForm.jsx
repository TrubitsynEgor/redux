import AddTodo from '../inputs/AddTodo';
import AddTodoBtn from '../buttons/AddTodoBtn';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../store/todoSlice';

const AddTodoForm = () => {

	const [text, setText] = useState('')
	const dispatch = useDispatch();

	const addTask = (e) => {
		e.preventDefault()
		dispatch(addTodo({ text }))
		setText('')
	}


	return (
		<form onSubmit={addTask}
			className='add-todo'>
			<AddTodo text={text} setText={setText} />
			<AddTodoBtn />
		</form>
	)
}

export default AddTodoForm