import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const Job = t.struct({
  enterJobTitle: t.String,
});

class JobForm extends React.Component {

  handleSubmit = () =>{
    const value = this._form.getValue(); // use that ref to get the form value
    
    if(value){
      this.props.handleSkillSearch(value.enterJobTitle)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Form ref={c => this._form = c} type={Job} />
        <Button
          title="Search!"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default JobForm
