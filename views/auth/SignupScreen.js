import React from 'react';
import { Alert, Platform, StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import firebase from 'firebase';
import ErrorMessage from '../utils/ErrorMessage';

export default class SignupScreen extends React.Component {

  constructor(props) {
    super(props);
    this._onSignup = this._onSignup.bind(this);
    this.state = {email: "", password: "", errorMessage: ""};
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  _onSignup() {
    this.handleSignUp();
  }
  

  render() {
    return (

      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Email'
            onChangeText={(email) => this.setState({email})}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={true}
            placeholder='Password'
            textContentType='password'
            onChangeText={(password) => this.setState({password})}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            title="Sign Up"
            onPress={this._onSignup}
          />
        </View>

        <ErrorMessage errorMessage={this.state.errorMessage} />

        <Text style={{padding: 10, fontSize: 20}}>
          Already registered? &nbsp;
          <Text style={{padding: 10, fontSize: 30, color: '#841584'}} onPress={() => this.props.navigation.navigate('Login')}>Login</Text>
        </Text>

      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    margin: 6, 
    width: 300,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  btnContainer: {
    padding: 20, 
    width: 200,
  }
});
