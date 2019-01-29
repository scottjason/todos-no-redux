const React = require('react');
const enzyme = require('enzyme');
const compose = require('redux').compose;
const { shallow, mount, render } = require('enzyme');
const { shallowToJson } = require('enzyme-to-json');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const withStubData = require('../utils/withStubData');
const withTodos = require('../utils/withTodos');
const LandingContainer = require('../containers/LandingContainer');

const config = { isStubData: true };

const EnhancedLanding = compose(
  withStubData,
  withTodos,
)(LandingContainer)


describe('LandingContainer', () => {
  it('it should have todos', () => {
    const output = shallow(
      <EnhancedLanding {...config} />
    );
    expect(output.props().todos.length > 0).toBe(true)
  });
  it('a todos status should be active', () => {
    const output = shallow(
      <EnhancedLanding {...config} />
    );
    expect(output.props().todos[0].status === 'active').toBe(true)
  });  
});
