import React, {Component} from 'react';
import classSet from '../utils/classSet';
import InputElement from 'Input';
import SubmitElement from 'Submit';

class FormElement extends Component {
  constructor(props) {
    super(props);
    this._onSubmit = this._onSubmit.bind(this);
  }
  render() {
    let props = this.props;
    let inputNodes = props.inputs.map( function ( item, index  ) {
      return <InputElement
                key={index}
                index={index}
                item={item}
                onChangeInputHandler={props.onChangeInputHandler} />;
    });
    return (
      <form className="form clearfix" onSubmit={this._onSubmit}>
        {inputNodes}
        <SubmitElement percent={this.props.percent}/>
      </form>
    );
  }
  _onSubmit(e){
    e.preventDefault();
    this.props.onSubmitFormHandler();
  }
}

export default FormElement;
