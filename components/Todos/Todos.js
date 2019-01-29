const React = require('react');
const Textarea = require('react-textarea-autosize').default;
      
const Todos = props => {
  const { todos, selectedView, textareaClasses, isNewMode } = props;
  const todosByView = todo => {
    return todo.status === selectedView;
  }
  const getEditPencil = todo => {
    if (todo.status !== 'active') { return null };
    return (<div className={props.iconClasses.pencil} onClick={() => props.onEditTodo(todo)} />);
  }
  const getCheckMark = todo => {
    if (todo.status !== 'active') { return null };
    return (<div className={props.iconClasses.check}  onDoubleClick={() => props.onCompleteTodo(todo)} />);
  }
  const hasTodos = () => {
    return todos.filter(todosByView).length > 0;
  }
  const getNoTodos = () => {
    return(
      <div className='row no-todos'>
        <p>{`No ${selectedView} todos`}</p>
      </div>
    )
  }
  const dateDesc = (x, y) => {
    return y.createdAt - x.createdAt;
  }
  return (
   <div ref={props.forwardRef} className='container'>
      {!hasTodos() && getNoTodos()}
      {isNewMode &&
        <div className='row new'>
          <Textarea onChange={props.onChangeNew} autoFocus={true} onClick={e => props.onAddTodo(e)} className={textareaClasses.writeEnabledNew} readOnly={false} minRows={3} maxRows={15} />
        </div>
      }
      {todos.filter(todosByView).sort(dateDesc).map((todo, i) => {
        const className = todo.isReadOnly ? textareaClasses.readOnly : textareaClasses.writeEnabled;
        const classNameRow = i === 0 ? 'row push-down' : 'row';
        todo = todo.isReadOnly ? todo : props.activeTodo;
        return (
          <div className={classNameRow} key={todo.id}>
            <Textarea onClick={() => props.onEditTodo(todo)} onChange={e => props.onChange(e, todo)} className={className} readOnly={todo.isReadOnly} minRows={3} maxRows={15} value={todo.description}  />
            <div className={props.iconClasses.trash} onDoubleClick={() => props.onDeleteTodo(todo)} />
            {getEditPencil(todo)}
            {getCheckMark(todo)}
          </div>
          )
      })}
   </div>
  );
}

Todos.defaultProps = {
  iconClasses: {
    trash: 'icon-bin',
    check: 'icon-checkmark',
    pencil: 'icon-pencil',
  },
  textareaClasses: {
    readOnly: 'textarea',
    writeEnabled: 'textarea write-enabled',
    writeEnabledNew: 'textarea write-enabled new',
  }
}

module.exports = React.forwardRef((props, ref) => <Todos innerRef={ref} {...props}/>);

