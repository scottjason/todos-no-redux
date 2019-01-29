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
const Navbar = require('../components/Navbar/Navbar');

const EnhancedNavbar = compose(
  withView,
  withStubData,
  withTodos,
)(EnhancedNavbar)

describe('Navbar', () => {
  it('it should be defined with parent class inner', () => {
    const output = shallow(<Navbar />);
    expect(output.find('.inner')).toBeDefined();
  });
  it('should have 4 <p> tags', () => {
    const output = render(<Navbar />); /* No HOC wrap */
    expect(output.children().find('p').length).toEqual(4)
  });
  it('should have 4 <p> tags', () => {
    const output = render(<Navbar />); /* No HOC wrap */
    expect(output.children().find('p').length).toEqual(4)
  });
  it('it should render with selected view active', () => {
    const output = shallow(<EnhancedNavbar />);
    expect(output.props().selectedView === 'active').toBe(true);
  });
});
