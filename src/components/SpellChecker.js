import React, { Component } from 'react';

import { Button, View, Text, ActivityIndicator, Clipboard, Animated, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
import { ScrollView } from 'react-native-gesture-handler';
import AntIcon from "react-native-vector-icons/AntDesign";

class SpellCheckScreen extends React.Component {

  _isMounted = false;

  static navigationOptions = {
    title: 'Spell Check',
  };
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      dataText: params ? params.text : '',
      resultText: '',
      visible: true
    };
    this.fadeAnimation = new Animated.Value(0)
  }
  componentDidMount() {

    this._isMounted = true;
    var dataText = this.state.dataText;

    return fetch('YOUR_WEB_SITE_WITH_SPELL_CHECKER',
      {

        method: 'POST',
        headers:
        {
          'Content-Type': 'text/html',
        },
        body: dataText


      }).then((response) => response.json()).then((data) => {

        // removing "b"

        var newData = '';

        data.map(el => newData = el);

        if (newData.substr(0, 2) == "b") {
          newData = newData.substr(1);
        }

        if (newData.substr(0, 2) == "be") {
          newData = newData.substr(2);
        }

        if (newData.charAt(newData.length - 1) == `'`) {
          newData = newData.substr(0, newData.length - 1);
        }

        console.log(newData)

        this.setState({
          resultText: newData
        })


      }).catch((error) => {
        console.log(error);

      });
  };


  componentWillUnmount() {
    this._isMounted = false;
  }


  animationStart() {
    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(this.fadeAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start()
      }, 1500)

    });

  }

  render() {
    const { params } = this.props.navigation.state;
    const text = params ? params.text : '';


    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={{ padding: 15 }}>
            {this.state.resultText == "" ? (
              <ActivityIndicator size="large" color="#1479d9" />
            ) : (
                <Text style={{ fontSize: 18 }}>{this.state.resultText}</Text>
              )}
          </View>

        </ScrollView>

        <View style={styles.animatedContainer}>

          <Animated.View style={[styles.container, { opacity: this.fadeAnimation }]}>
            <Text style={styles.text}>Text was copied</Text>
          </Animated.View>

        </View>

        {this.state.resultText !== "" ? (
          <View style={{ margin: 20, position: 'absolute', bottom: 0, right: 0, flexDirection: 'row' }}>
            <AntIcon name='copy1' style={{
              backgroundColor: '#1479d9', fontSize: 32, color: 'white',
              padding: 10, borderRadius: 50, marginRight: 8
            }} onPress={() => {
              Clipboard.setString(this.state.resultText),
                this.animationStart()
            }} />
          </View>
        ) : (
            <View></View>
          )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#363636',
    width: 180,
    height: 50,
    borderRadius: 4
  },
  text: {
    color: 'white',
    fontSize: 19,
  },
  animatedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
});


export default SpellCheckScreen;