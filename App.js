import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './components/Auth';
import { NativeRouter, Switch, Route } from 'react-router-native';
import store from './store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/FetchUser';
import Coins from './components/Coins';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <FetchUser>
          <NativeRouter>
            <View style={styles.container}>
              <Switch>
                <ProtectedRoute exact path="/" component={Coins} />
                <Route exact path="/login" render={props => <Auth {...props} type="Login" /> } />
                <Route exact path="/register" render={props => <Auth {...props} type="Register" /> } />
              </Switch>
            </View>
          </NativeRouter>
        </FetchUser>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
