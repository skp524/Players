import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('VideoSongs')}>
          <Text style={styles.btnText}>
            Video Songs
        </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('AudioSongs')}>
          <Text style={styles.btnText}>
            Audio Songs
        </Text>
        </TouchableOpacity>
      </View>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#3f7ca3',
    height: '100%',
  },
  btnContainer: {
    marginTop: 250
  },
  text: {
    fontSize: 16,
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  btn: {
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#349bdc',
    margin: 20,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18
  }

});
export default Home;