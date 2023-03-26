import cls from './AddTodo.module.css'


const AddTodo = ({ text, setText }) => {

	return (
		<label className={cls.AddTodo}>
			<input className={cls.AddTodoInput + ' form-control'} type="text" value={text} onChange={(e) => setText(e.target.value)} />
		</label>
	)
}

export default AddTodo