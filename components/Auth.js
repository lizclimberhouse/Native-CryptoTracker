import React from 'react';
import { View, Button, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet } from 'react-native';
// if your backgorund color has no color use touchableHighlight, if backgroud has a color, use touchableOpacity. 
// use styleSheet becuase if you only use a styled object the error wont show up but with styleSheet, an error shows up
import { Link } from 'react-router-native';
import { connect } from 'react-redux'; //if we're going to use redux we need connect from react-redux
import { registerUser, handleLogin } from '../actions/auth';

class Auth extends React.Component {
  state = { email: '', password: '', passwordConfirmation: '', error: '', }

  handleSubmit = () => {
    const { dispatch, type, history } = this.props;
    const { email, password, passwordConfirmation } = this.state
    if (type === 'Register')
      dispatch(registerUser(email, password, passwordConfirmation, history))
    else
      dispatch(handleLogin(email, password, history))
    this.setState({ email: '', password: '', passwordConfirmation: '' })
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state
    let submit = false
    let error;
    if (email && password)
      submit = true
    if (this.props.type === 'Register') {
      if (!passwordConfirmation) {
        submit = false
      } else if ((passwordConfirmation && password) && passwordConfirmation !== password) {
        error = "Passwords Must Match"
        submit = false
        if (!this.setState.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }
    return submit
  }

  render() {
    //controlled textbox
    const { email, password, passwordConfirmation, error, } = this.state;
    const { type } = this.props;
    //const disabled = !this.canSubmit();
    const disabled = false;

    return (
      //if the error is not an empty string then render the error in a Text tag. Could use a turinary but this is better to use this "short curcuit" method (if the top is false it just goes to the next line of code.
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { error !== '' && 
          <Text style={styles.error}>{error}</Text> 
        }
        <Text style={styles.title}>{ type }</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoFocus
          autoCapitalize="none" // auto caps options are none, words, sentneces.
          autoCorrect={false}
          value={email}
          keyboardType="email-address"
          onChangeText={ (email) => this.setState({ email }) }
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={password}
          onChangeText={ (password) => this.setState({ password }) }
        />
        { type === 'Register' && 
        <TextInput
          style={styles.input}
          placeholder="passwordConfirmation"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={passwordConfirmation}
          onChangeText={ (passwordConfirmation) => this.setState({ passwordConfirmation }) }
        />
        }
        
        <TouchableOpacity
          onPress= {disabled ? f => f : this.handleSubmit }
        >
          <Text style={styles.button}>{type}</Text>
        </TouchableOpacity>
        <Link to={ type === 'Register' ? '/login' : '/register' }>
          <Text style={styles.link}>
            { type === 'Register' ? 'Login' : 'Register' }
          </Text>
        </Link>

        {/* ^^^ this is the other approapch, now we just disable thte button until the validation is good then emable it.
        TouchableOpacity needs to wrap something with a background color.

         { this.canSubmit() && 
          <Button
            onPress={this.handleSubmit}
            title={this.props.type}
            color="green"
          />
        some buttons are self closing some are not. this one is bc it has a title? lectire 4/4/18 wednesday 10am
        if you are doing this method of not showing the button until all the validations are good, you need to display clear error messages. Other option is to not have the button work until validation is good to go. 
        }*/}
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  link: {
    color: 'lightblue',
    fontSize: 20,
  },
  container: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: { color: 'red' },
  title: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 300,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 40,
    fontSize: 20,
    lineHeight: 30,
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  }
})

export default connect()(Auth);