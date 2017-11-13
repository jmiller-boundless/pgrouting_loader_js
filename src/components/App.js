/*
    ./src/components/App.jsx
*/
import React from 'react';
import {connect} from 'react-redux';
import Validator from 'validatorjs';
import classSet from '../utils/classSet';
import ProgressElement from 'Progress';
import FormElement from 'Form';
import { progressPercent } from '../actions/items';

class App extends React.Component {
  constructor(props) {
    super(props);
    this._onChangeInputHandler = this._onChangeInputHandler.bind(this);
    this._onSubmitFormHandler = this._onSubmitFormHandler.bind(this);
  }

  componentDidMount() {
    let inputDatas = this.props.inputDatas;
    console.log("inputDatas from app",inputDatas);
    this.setState( { inputDatas: inputDatas } );
    this._initialInputVerification();
  }
  render(){
    return (
      <div>
        <ProgressElement percent={this.props.progressPercent} />
        <FormElement
          inputs={this.props.inputDatas}
          onChangeInputHandler={this._onChangeInputHandler}
          onSubmitFormHandler={this._onSubmitFormHandler}
          percent={this.props.progressPercent} />
      </div>
    );
  }
  _initialInputVerification(){
    let self = this;
    this.props.inputDatas.forEach( function ( item, index ) {
      self._setAndValidateInput( index, item.value );
    });
    this._calculatePercent();
  }
  _resetInputDatas() {

      let inputDatas = this.props.inputDatas.map( function ( item ) {
        item.value = '';
        item.pristine = true;
        item.hasError = false;
        return item;
      });
      this.setState( { inputDatas: inputDatas } );
      this._initialInputVerification();

    }
    _calculatePercent() {

      let total = this.props.inputDatas.length;
      let done = 0;
      let progressPercent;
      this.props.inputDatas.forEach( function( item ) {
        if( item.hasError === false ) {
          done += 1;
        }
      });
      progressPercent = done/total*100;
      this.props.progressUpdate( progressPercent);

    }
    _setAndValidateInput( index, value, noMorePristine ) {

      let pristine = noMorePristine ? false : true;
      let inputDatas = this.props.inputDatas;
      let item = inputDatas[index];
      let data = {};
      let validation;

      inputDatas[index].value = value;
      inputDatas[index].pristine = pristine;
      inputDatas[index].hasError = false;
      inputDatas[index].errorMessage = '';

      data[item.id] = value || '';

      validation = new Validator( data, item.validation.rules, item.validation.messages );
      if( validation.fails() ) {
        inputDatas[index].hasError = true;
        inputDatas[index].errorMessage  = validation.errors.first( item.id );
      }
      this.setState( { inputDatas: inputDatas } );

    }
    _onChangeInputHandler( index, value ) {

      this._setAndValidateInput( index, value, true );
      this._calculatePercent();

    }
    _onSubmitFormHandler() {

      if ( this.props.progressPercent >= 100 ) {
        this._resetInputDatas();
        this._calculatePercent();
      }

    }

}

const mapStateToProps = (state) => {
  return {
    progressPercent: state.progressPercent,
    inputDatas: state.inputDatas
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log("mapdispatch percent",dispatch);
  return {
    fetchData: (url) => dispatch(itemsFetchData(url)),
    progressUpdate: (percent) =>dispatch(progressPercent(percent))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
