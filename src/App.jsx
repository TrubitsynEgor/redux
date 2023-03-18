import './vendor/bootstrap.min.css'
import './App.css';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from './components/UI/forms/AddTodoForm';

const App = () => {


  return (
    <div className="App">

      <AddTodoForm />
      <TodoList />

    </div>
  );
}

export default App;
