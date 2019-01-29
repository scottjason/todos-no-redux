const React = require('react');
const enzyme = require('enzyme');
const compose = require('redux').compose;
const { shallow, mount, render } = require('enzyme');
const { shallowToJson } = require('enzyme-to-json');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });

const withStubData = require('../utils/withStubData');
const withTodos = require('../utils/withTodos');
const withView = require('../utils/withView');
const Todos = require('../components/Todos/Todos');

const EnhancedTodos = compose(
  withView,
  withStubData,
  withTodos,
)(Todos)

describe('Todos', () => {
  it('it should be defined with parent class container', () => {
    const output = shallow(<Todos />);
    expect(output.find('.container')).toBeDefined();
  });
  it('it should have a toggleView function', () => {
    const output = shallow(<EnhancedTodos />);
    expect(typeof output.props().onToggleView).toEqual('function')
  });  
  it('it should have a onToggleNewMode function', () => {
    const output = shallow(<EnhancedTodos />);
    expect(typeof output.props().onToggleNewMode).toEqual('function')
  });
  it('it should have selectedView in state as active ', () => {
    const output = shallow(<EnhancedTodos />);
    expect(output.state().selectedView === 'active').toBe(true);
  });
  it('isNewMode should be false in state', () => {
    const output = shallow(<EnhancedTodos />);
    expect(output.state().isNewMode).toBe(false);
  });
  it('when onToggleNewMode is clicked, isNewMode value in state should invert to true', () => {
    const output = shallow(<EnhancedTodos />);
    output.props().onToggleNewMode()
    expect(output.state().isNewMode).toBe(true);
  });
});
