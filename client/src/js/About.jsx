var React = require('react');
var request = require('superagent');

var About = React.createClass({

  getInitialState: function() {
    return {
      about: null
    }
  },

  componentDidMount: function() {
    request.get('/api/about')
      .end(function(err, resp) {
        var about = resp.body.about;

        this.setState({
          about: about
        });
      }.bind(this));
  },

  renderAbout: function() {
    if (this.state.about) {
      return this.state.about.map(function(aboutObj) {
        return (
          <div>
            {aboutObj.name}
          </div>
        )
      });
    }
  },

  render: function() {
    return (
      <div className="container">
        <div>Nugget is a web app to listify things.</div>
        {this.renderAbout()}
      </div>
    );
  }

});

module.exports = About;