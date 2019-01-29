const React = require('react');
const Navbar = require('../components/Navbar/Navbar');
const Todos = require('../components/Todos/Todos');

class LandingContainer extends React.Component {
  constructor(props) {
    super();
    this.state = {};
  }
  // static getDerivedStateFromProps(props, currentState) {
  //   if (currentState !== props) {
  //     return props;
  //   }
  //   return currentState;
  // }
  render() {
    return(
      <div>
        <Navbar {...this.props} />
        <Todos {...this.props} />
      </div>
    )
  }
}

module.exports = LandingContainer;
