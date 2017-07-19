import React from 'react';
import PropTypes from 'prop-types';

class ModalFooter extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    let {children} = this.props;
    return (
      <div className="modal-footer">{children}</div>
    );
  }
}

export default ModalFooter;
