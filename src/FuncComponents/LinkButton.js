import {withRouter} from 'react-router-dom';
import React from 'react';
class LinkButton extends React.Component {

    nextPath(path) {
      this.props.history.push(path);
    }
  
    render() {
        const { className, to, value } = this.props;
      return (
        <button className={className} onClick={() => this.nextPath(to) }>
          {value}
        </button>
      );
    }
  }
  
  export default withRouter(LinkButton);