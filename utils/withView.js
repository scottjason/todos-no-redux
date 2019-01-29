/**
*
* withView
*
* HOC Component
* Responsible for generating and holding state of the `todos` data
* Its callbacks are passed to its children so that when invoked we're in scope with state
*
* This component also accepts `todos` as props and handles those like any other `todo`
*
*/

const React = require('react');

const withView = Component => {
  return class withView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedView: 'active', 
        isNewMode: false,
      }
    }
    onToggleView = selectedView => {
      const shouldChangeNewMode = selectedView !== 'active';
      if (shouldChangeNewMode) {
        this.setState({ selectedView, isNewMode: false });
      } else {
        this.setState({ selectedView });
      }
    }
    onToggleNewMode = () => {
      const shouldChangeView = !this.state.isNewMode && this.state.selectedView !== 'active';
      if (shouldChangeView) {
        this.setState({ isNewMode: !this.state.isNewMode, selectedView: 'active' });
      } else {
        this.setState({ isNewMode: !this.state.isNewMode });
      }
    }
    render() {
      const newProps = {...this.props, ...this.state};
      return(
        <Component
          {...newProps}
          onToggleView={this.onToggleView}
          onToggleNewMode={this.onToggleNewMode}
        />
      )
    }
  }
};

module.exports = withView;
