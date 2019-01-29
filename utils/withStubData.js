

/**
*
* withStubData
*
* HOC Component
* Responsible for generating and holding state of the `todos` stub data
* Components that are wrapped in this HOC have these stubbed `todos` available on their `props`
*
*/

const React = require('react');
const faker = require('faker');

const withStubData = WrappedComponent => {
  return class withStubData extends React.Component {
    constructor(props) {  
      super(props);
      this.numTodos = 2;
      this.state = {
        todos: [],
        oneSentenceOnly: false,
      }
    }
    componentDidMount() {
      const todos = this.generate();
      this.setState({ todos });
    }
    generateRandId() {
      return faker.random.uuid();
    }
    getNumSentences(idx) {
      this.state.oneSentenceOnly ? 1 : (idx % 2 === 0 ? 1 : 2);
    }
    generate() {
      let output = [];
      while(output.length < this.numTodos) {
        output.push(this.extractTodo(output.length - 1));
      }
      return output;
    }
    extractTodo(idx) {
      var createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - (1 + idx));
      return { 
        id: this.generateRandId(),
        createdAt: createdAt,
        description: this.generateSentence(this.getNumSentences(idx)),
        isReadOnly: true,
        status: 'active'
      }
    }
    generateSentence(numSentences) {
      let output = '';
      Array.from(Array(numSentences)).forEach((x, i) => {
        output += `\u00A0${faker.lorem.paragraph() }`;
      });
      return output;
    }
    render() {
      const newProps = {...this.props, ...this.state};
      return (
        <WrappedComponent {...newProps} />
      )
    }
  }
};

module.exports = withStubData;
