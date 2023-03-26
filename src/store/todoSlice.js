import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async (_, { rejectWithValue }) => {
		try {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
			if (!response.ok) throw new Error('Server Error');
			const data = await response.json();
			return data
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
		}

	}
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodo',
	async (id, { rejectWithValue, dispatch }) => {
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'DELETE',
			})
			if (!response.ok) throw new Error('Can\'t delete task! Server Error')

			dispatch(removeTodo(id))
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
		}
	}
)

export const toggleCompleted = createAsyncThunk(
	'todos/toggleCompleted',
	async (id, { rejectWithValue, dispatch, getState }) => {
		const todo = getState().todos.todos.find(todo => todo.id === id)
		try {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					completed: !todo.completed
				})
			})
			if (!response.ok) throw new Error('Can\'t toggle task! Server Error');

			dispatch(toggleTodoComplete(id))
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
		}
	}
)

export const createTodo = createAsyncThunk(
	'todos/createTodo',
	async (text, { rejectWithValue, dispatch }) => {
		try {
			const todo = {
				title: text,
				userId: 1,
				completed: false
			}

			const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(todo)
			})

			if (!response.ok) throw new Error('Can\'t add task! Server Error');

			const data = await response.json()

			dispatch(addTodo(data))

		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message)
			}
		}
	}
)

const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}
const clearError = (state, action) => {
	state.error = null;
}
const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo(state, action) {
			state.todos.push(action.payload)
		},
		removeTodo(state, action) {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		},
		toggleTodoComplete(state, action) {
			const toggledTodo = state.todos.find(todo => todo.id === action.payload)
			toggledTodo.completed = !toggledTodo.completed
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null

		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: setError,

		[deleteTodo.pending]: clearError,
		[deleteTodo.rejected]: setError,

		[toggleCompleted.pending]: clearError,
		[toggleCompleted.rejected]: setError,


	},
})

const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;