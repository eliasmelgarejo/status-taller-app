import React from 'react';
import './style.css';

class OrdenPopup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    );
  }
}

export default OrdenPopup;