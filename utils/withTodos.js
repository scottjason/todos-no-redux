const React = require('react');
const faker = require('faker');

/**
*
* withTodos
*
* HOC Component
* Responsible for generating and holding state of the `todos` data
* Its callbacks are passed to its children so that when invoked we're in scope with state
*
* This component also accepts `todos` as props and handles those like any other `todo`
*
*/

const withTodos = WrappedComponent => {
  return class withTodos extends React.Component {
    constructor(props) {
      super(props);
      this.forwardRef = React.createRef();
      this.state = {
        todos: [],
        activeTodo: {},
        newTodo: {},
      }
    }
    onDocumentClick = e => {
      const isContainerClick = this.forwardRef.current.contains(e.target);
      if (!isContainerClick && this.isEditing()) {
        this.discardAndExit();
      }
    }
    componentDidUpdate(prevProps) {
      if (!this.state.todos.length && this.props.isStubData) { /* stub data update */
        this.setState({ todos: this.props.todos })
      }
      if (this.isEditing() || this.props.isNewMode) {
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('click', this.onDocumentClick);
      } else {
        document.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('click', this.onDocumentClick);
      }
    }
    isEnterBtn(e) {
      return e.key === 'Enter';
    }
    isEscapeBtn(e) {
      return e.key === 'Escape';
    }
    isEditing() {
      return Object.keys(this.state.activeTodo).length > 0;
    }
    toggleNewMode = () => {
      this.setState({ isNewMode: !this.state.isNewMode })
    }
    deActivate = todo => {
      todo.isReadOnly = true;
      return todo;
    }
    onChange = (e, todo) => {
      let activeTodo = {...todo};
      const description = e.currentTarget.value;
      activeTodo.description = description;
      this.setState({ activeTodo })
    }
    onChangeNew = e => {
      let newTodo = {...this.state.newTodo};
      const description = e.currentTarget.value;
      newTodo.description = description;
      this.setState({ newTodo });
    }
    saveAndExit() {
      let todos = [...this.state.todos];
      let activeTodo = {...this.state.activeTodo};
      activeTodo.isReadOnly = true;
      const targetIdx = this.state.todos.findIndex(todo => todo.id === activeTodo.id);
      todos[targetIdx] = activeTodo;
      activeTodo = {}
      this.setState({ todos, activeTodo })
    }
    discardAndExit() {
      let activeTodo = {};
      let todos = this.state.todos.map(this.deActivate);
      this.setState({ todos, activeTodo });
    }
    onKeyDown = e => {
      
      const isEnterBtn = this.isEnterBtn(e);
      const isEscapeBtn = this.isEscapeBtn(e);
      
      if (isEnterBtn && this.isEditing()) {
        e.preventDefault();
        this.saveAndExit();
      } else if (isEnterBtn && this.props.isNewMode) {
        e.preventDefault();
        this.onAddTodo();
      } else if (this.isEscapeBtn(e)) {
        e.preventDefault();
        this.discardAndExit();
      }
    }
    onAddTodo = () => {
      let todos = [...this.state.todos];
      let newTodo = {...this.state.newTodo};
      if (!newTodo.description) { return }
      newTodo.id = faker.random.uuid();
      newTodo.isReadOnly = true;
      newTodo.status = 'active';
      newTodo.createdAt = new Date()
      todos.push(newTodo);
      newTodo = {};
      this.setState({ todos, newTodo })
      this.props.onToggleNewMode()
    }
    onEditTodo = todo => {
      let todos = this.state.todos.map(this.deActivate);
      const targetIdx = todos.findIndex(td => td.id === todo.id);
      let activeTodo = todos[targetIdx];
      if (activeTodo.status !== 'active') { return };
      activeTodo.isReadOnly = false;
      todos[targetIdx] = activeTodo;
      this.setState({ todos, activeTodo });
    }
    onDeleteTodo = todo => {
      let todos = [...this.state.todos];
      const targetIdx = todos.findIndex(td => td.id === todo.id);
      let targetTodo = todos[targetIdx];
      targetTodo.status = 'deleted';
      todos[targetIdx] = targetTodo;
      this.setState({ todos });
    }
    onCompleteTodo = todo => {
      let todos = [...this.state.todos];
      const targetIdx = todos.findIndex(td => td.id === todo.id);
      let targetTodo = todos[targetIdx];
      targetTodo.status = 'completed';
      todos[targetIdx] = targetTodo;
      this.setState({ todos });
    }
    render() {
      const newProps = {...this.props, ...this.state};
      return (
        <WrappedComponent
          {...newProps}
          forwardRef={this.forwardRef}
          onAddTodo={this.onAddTodo}
          onEditTodo={this.onEditTodo}
          onDeleteTodo={this.onDeleteTodo}
          onChange={this.onChange}
          onChangeNew={this.onChangeNew}
          onCompleteTodo={this.onCompleteTodo}
        />
      );
    }
  }
};

module.exports = withTodos;
