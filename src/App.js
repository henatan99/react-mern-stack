import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTodoComponent from './components/addTodo.components';
import ViewTodoComponent from './components/viewTodo.components';

function App() {
  return (
    <div className="App container mt-5">
      <AddTodoComponent />
      <ViewTodoComponent />
    </div>
  );
}

export default App;
