/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native';

const deepCopy = (object) => {
  const stringifyObject = JSON.stringify(object)
  return JSON.parse(stringifyObject)
}

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      result: 0,
      calculateText: 0,
      calculateNumber: 0,
      alertStyle: {}
    }
  }

  buttenPressed(value) {
    if (value !== '=') {
      if (value === ',') value = '.'

      let currentState = deepCopy(this.state)
      if (this.state.calculateText === 0)
        currentState.calculateText = value
      else currentState.calculateText += value
      this.setState(currentState)
    } else {
      this.calculate()
    }
  }

  calculate() {
    try {
      let currentState = deepCopy(this.state)
      const hasil = eval(currentState.calculateText)
      currentState.result = `${hasil}`
      currentState.calculateText = `${hasil}`
      this.setState(currentState)
    } catch (error) {
      this.signAlert()
    }
  }

  signAlert(){
    let currentState = deepCopy(this.state)
    currentState.alertStyle = {
      color: '#880909e8'
    }
    this.setState(currentState)

    setTimeout(()=>{
      currentState.alertStyle = {
        color: 'white'
      }
      this.setState(currentState)
    },1500)
  }

  buttonOperationPressed(value) {
    let currentState = deepCopy(this.state)
    if (value === 'DEL') {
      const currentTextLength = currentState.calculateText.length
      currentState.calculateText = currentState.calculateText.slice(0, (currentTextLength - 1))
    } else if (value === 'X') {
      currentState.calculateText += '*'
    } else {
      currentState.calculateText += value
    }

    this.setState(currentState)
  }

  render() {
    let numberButton = ['1','2','3','4','5','6','7','8','9',',','0','=']
    let buttonRow = [] 
    for(let i=0; i< 4; i++){
      let row = []
      for(let j=0; j< 3; j++){
        const buttonText = numberButton[(i*3)+j] 
        row.push(<TouchableOpacity key={(3*i)+j} style={styles.button} onPress={() => { this.buttenPressed(buttonText) }}><Text style={styles.buttonText}>{buttonText}</Text></TouchableOpacity>)
      }
      buttonRow.push(<View key={i} style={styles.row}>{row}</View>)
    }

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}> {this.state.result} </Text>
        </View>

        <View style={styles.calculate}>
          <Text style={[styles.calculateText,this.state.alertStyle]}> {this.state.calculateText} </Text>
        </View>

        <View style={styles.buttonsContainer}>  
          <View style={styles.buttons}>
            {buttonRow}
          </View>
          
          <View style={styles.operations}>
              <TouchableOpacity style={styles.button} onPress={()=>{ this.buttonOperationPressed('DEL') }}><Text style={[styles.buttonText,styles.operationButtonText]}>DEL</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{ this.buttonOperationPressed('/') }}><Text style={[styles.buttonText,styles.operationButtonText]}>/</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{ this.buttonOperationPressed('X') }}><Text style={[styles.buttonText,styles.operationButtonText]}>X</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{ this.buttonOperationPressed('-') }}><Text style={[styles.buttonText,styles.operationButtonText]}>-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{ this.buttonOperationPressed('+') }}><Text style={[styles.buttonText,styles.operationButtonText]}>+</Text></TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    backgroundColor: 'gray',
    padding: 20
  },
  resultText: {
    fontSize: 30,
    textAlign: 'right',
    margin: 10,
    color: 'white'
  },
  calculate: {
    backgroundColor: 'gray',
    padding: 30,
    paddingRight: 30
  },
  calculateText: {
    fontSize: 20,
    textAlign: 'right',
    margin: 10,
    color: 'white'
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  buttons: {
    flex: 3,
    backgroundColor: 'white'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20
  },
  operationButtonText: {
    color: 'white'
  },
  operations: {
    flex: 1,
    backgroundColor: '#5891ef',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }
});
