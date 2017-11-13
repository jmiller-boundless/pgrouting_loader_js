import React, {Component} from 'react';
import classSet from '../utils/classSet';

class InputElement extends Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }
  render(){
    let item = this.props.item;
    let classes = classSet({
      "form--group": true,
      "has--error": item.hasError && !item.pristine
    });
    return (
      <div className={classes}>
        <label htmlFor={item.id}>{item.label}</label>
        <input type="text" className="form--control" id={item.id} value={item.value} onChange={this._onChange}/>
        <span className="form--focus"></span>
        <span className="form--error">{item.errorMessage}</span>
      </div>
    );

  }
  _onChange(e){
    let value = e.target.value;
    this.props.onChangeInputHandler( this.props.index, value);
  }
}

export default InputElement;
