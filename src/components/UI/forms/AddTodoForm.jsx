import AddTodo from '../inputs/AddTodo';
import AddTodoBtn from '../buttons/AddTodoBtn';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo, fetchTodos } from '../../../store/todoSlice';

const AddTodoForm = () => {

	const [text, setText] = useState('')
	const dispatch = useDispatch();

	const addTask = (e) => {
		e.preventDefault()
		dispatch(createTodo(text))
		setText('')
	}

	useEffect(() => {
		dispatch(fetchTodos())
	}, [dispatch])


	return (
		<>
			<form onSubmit={addTask}
				className='add-todo'>
				<AddTodo text={text} setText={setText} />
				<AddTodoBtn>Add todo</AddTodoBtn>
			</form>


		</>

	)
}

export default AddTodoForm