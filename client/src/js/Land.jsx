var React = require('react');

require('./landing.scss');

var Landing = React.createClass({

  getInitialState: function() {
    return {
      counter: 1
    }
  },

  componentDidMount: function() {
    console.log('mounted');
  },

  changeCounter: function(changeType) {
    var count = this.state.counter;

    if (changeType === 'add') {
      count = count + 2
    } else {
      count = count - 1;
    }

    this.setState({
      counter: count
    });
  },

  render: function() {
    return (
      <div className="container">
        <div>Hello world!</div>
        <div>Counter number: {this.state.counter}</div>
        <button onClick={this.changeCounter.bind(null, 'add')}>Add 2</button>
        <button onClick={this.changeCounter.bind(null, 'subtract')}>Subtract 1</button>
      </div>
    );
  }

});

module.exports = Landing;