import React from 'react';
import Action from './Action';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';

export default class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    console.log('component did mount');
    const json = localStorage.getItem('options');
    const options = JSON.parse(json);
    if (options) {
      this.setState(() => ({
        options
      }));
    }
  }

  componentDidUpdate(preProps, prevState) {
    try {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json); 
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    console.log('component will unmount');
  }

  handleDeleteOptions() {
    this.setState(() => ({
      options: []
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    alert(this.state.options[randomNum]);
  }

  handleDeleteOption(optionToRemove) {
    this.setState(({ options }) => ({
      options: options.filter(option => option !== optionToRemove)
    }));
  }

  handleAddOption(option) {
    if (!option) {
      return 'enter a value';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exists';
    } else {
      this.setState(({options}) => ({
        options: options.concat(option)
      }));
    }
  }

  render() {
    const title = 'Indecision';
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
          />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
          />
        <AddOption
          handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}