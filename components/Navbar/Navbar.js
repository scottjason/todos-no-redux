const React = require('react');

const Navbar = props => {
  const { selectedView, onToggleView, onToggleNewMode, tabClasses, toggleOpts } = props;
  const getClassName = view => {
    return selectedView === view ? tabClasses.tabActive : tabClasses.tabDefault;
  }
  return(
    <nav>
      <div className='inner'>
        <section className='section-left'>
          <p onClick={onToggleNewMode} className={getClassName('new')}>new todo</p>
        </section>
        <section className='section-right'>
          <p onClick={() => onToggleView(toggleOpts.active)} className={getClassName(toggleOpts.active)}>active</p>
          <span> | </span>
          <p id='completed' onClick={() => onToggleView(toggleOpts.completed)} className={getClassName(toggleOpts.completed)}>completed</p>
          <span> | </span>
          <p onClick={() => onToggleView(toggleOpts.deleted)} className={getClassName(toggleOpts.deleted)}>deleted</p>
        </section>
      </div>
    </nav>
  )
};

Navbar.defaultProps = {
  tabClasses: {
    tabDefault: 'tab-copy',
    tabActive: 'tab-copy active',
  },
  toggleOpts: {
    active: 'active',
    completed: 'completed',
    deleted: 'deleted',
  }
}

module.exports = Navbar;
