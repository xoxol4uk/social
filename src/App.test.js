import NewApp from './App';
import ReactDOM from 'react-dom';
import React from 'react';

it('renders learn react link', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
