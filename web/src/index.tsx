import gql from 'graphql-tag';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useMutation } from 'urql';
import reportWebVitals from './reportWebVitals';
import { client } from './urql';

const toggleTodoMutation = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      text
    }
  }
`;

const App = () => {
  const [result, toggle] = useMutation(toggleTodoMutation);

  const handleClick = async () => {
    await toggle({ id: '1' });
    console.log(result);
  };

  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
