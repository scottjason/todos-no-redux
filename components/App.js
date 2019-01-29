const React = require('react');
const render = require('react-dom').render;
const compose = require('redux').compose;
const LandingContainer = require('../containers/LandingContainer');
const withStubData = require('../utils/withStubData');
const withTodos = require('../utils/withTodos');
const withView = require('../utils/withView');

const config = { isStubData: true };

const EnhancedLanding = compose(
  withView,
  withStubData,
  withTodos,
)(LandingContainer)

const App = () => (
  <div className='appContainer'>
    <EnhancedLanding {...config} />
  </div>
)

render(
  <App />,
  document.getElementById('root')
);
