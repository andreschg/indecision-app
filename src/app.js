import React from 'react';
import ReactDOM from 'react-dom';

class IndecisionApp extends React.Component {
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
        <AddOptions
          handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = ({ title = "Title", subtitle }) => (
  <div>
    <h1>{ title }</h1>
    { subtitle && <h2>{ subtitle }</h2>}
  </div>
);

const Action = (props) => (
  <div>
    <button 
      onClick={props.handlePick}
      disabled={!props.hasOptions}>
        What should I do?
    </button>
  </div>
);

const Options = (props) => (
  <div>
    <button onClick={props.handleDeleteOptions}>Remove All</button>
    { props.options.length === 0 && <p>Please add an option!</p> }
      { 
        props.options.map(option => (
          <Option 
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
            /> 
        ))
      }
  </div>
);

class AddOptions extends React.Component {

  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    if (error) {
      this.setState(() => ({
        error
      }));
    }
    // Clean input 
    e.target.elements.option.value = '';
  } 

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button type="submit">Submit</button>
        </form>
        <p>AddOptions component</p>
      </div>
    )
  }
}

const Option = (props) => (
  <div>
    { props.optionText }
    <button onClick={() => props.handleDeleteOption(props.optionText)}>
      Remove
    </button>
  </div>
);

ReactDOM.render(
  <IndecisionApp />,
  document.getElementById('app')
);
