import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import Modal from 'react-modal';
import 'normalize.css/normalize.css'
import './styles/styles.scss';

Modal.setAppElement('#modal-app-el');

ReactDOM.render(
  <IndecisionApp />,
  document.getElementById('app')
);
