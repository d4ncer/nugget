var React = require('react');

var About = React.createClass({

  render: function() {
    return (
      <div className="container">
        <div>Nugget is a webapp to listify things.</div>
      </div>
    );
  }

});

React.render(<About />, document.querySelector('#reactContainer'));