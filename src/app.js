import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import Modal from 'react-modal';

Modal.setAppElement('#modal-app-el');

ReactDOM.render(
  <IndecisionApp />,
  document.getElementById('app')
);
