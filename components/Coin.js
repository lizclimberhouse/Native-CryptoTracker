import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { removeCoin } from '../actions/coins';
import { connect } from 'react-redux';

class Coin extends React.Component {
  state = { color: 'green' }

  // this compontnetWillRecieveProps is about to be gone, need to fix with updates
  // its dangerus to use this without having a check taht something actually changed or if you set state outside of your check, bc if that setstate causes new ___...
  componentWillReceiveProps(nextProps) {
    const { price } = nextProps;
    let color;
    if (price !== this.props.price) {
      if (price > this.props.price)
        color = 'green'
      else
        color = 'red'

      this.setState({ color })
    }
  }

  swipeButtons = () => {
    const { dispatch, id } = this.props;
    return [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => { dispatch(removeCoin(id)) }
      } // another button? just , { new object... }
    ]
  }

  render() {
    const { symbol, price } = this.props;
    const { color } = this.state;
    return (
      <Swipeout right={this.swipeButtons()} autoClose={true} backgroundColor="transparent" >
        <ListItem
          rightTitle={`$${parseFloat(price).toFixed(2)}`}
          rightTitleStyle={styles[color]} // ['green'] same as .green, therefor inside of state is green or red, so we call the property like this: styles[color]
          title={symbol}
          titleStyle={styles.title}
        />
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  title: { color: 'white' },
  green: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
    width: 100,
    padding: 5,
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
    width: 100,
    fontSize: 20,
    padding: 5,
  },
});

export default connect()(Coin);