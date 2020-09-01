import React, { Component } from 'react';
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Icons from 'react-native-vector-icons/Ionicons';

class AudioSongs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      icon: 'play',
      audioURI: '',
      audioName: 'audio',
      volume: 1.0,
      audioList: [
        { name: 'audio', audioURI: '../assets/audio/audio.mp3' },
        { name: 'audio1', audioURI: '../assets/audio/audio1.mp3' },
        { name: 'audio2', audioURI: '../assets/audio/audio2.mp3' },
        { name: 'audio3', audioURI: '../assets/audio/audio3.mp3' },
        { name: 'audio4', audioURI: '../assets/audio/audio4.mp3' },
        { name: 'audio5', audioURI: '../assets/audio/audio4.mp3' },
      ],
    }
    this.start();

  }
  get audioURI() {
    switch (this.state.audioURI) {
      case '../assets/audio/audio.mp3':
        return require('../assets/audio/audio.mp3');

      case '../assets/audio/audio1.mp3':
        return require('../assets/audio/audio1.mp3');

      case '../assets/audio/audio2.mp3':
        return require('../assets/audio/audio2.mp3');

      case '../assets/audio/audio3.mp3':
        return require('../assets/audio/audio3.mp3');

      case '../assets/audio/audio4.mp3':
        return require('../assets/audio/audio4.mp3');

      default:
        return require('../assets/audio/audio.mp3');
    }
  }
  start = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: 'trackId',
      url: this.audioURI,
      artwork: require('../assets/images/mp3.png')
    });
  };
  increaseVolume = () => {
    (this.state.volume < 1) && this.setState({ volume: this.state.volume + .1 });
    TrackPlayer.setVolume(this.state.volume);
  }
  decreaseVolume = () => {
    (this.state.volume > 0) && this.setState({ volume: this.state.volume - .1 });
    TrackPlayer.setVolume(this.state.volume);
  }
  MusicHandler = () => {
    this.state.icon === 'play' ? this.setState({ icon: 'pause' }) : this.setState({ icon: 'play' });
    this.state.icon === 'play' ? TrackPlayer.play() : TrackPlayer.pause();
  }
  changeSong = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add({
      id: this.state.audioURI,
      url: this.audioURI,
      artwork: require('../assets/images/mp3.png')
    });
    TrackPlayer.skip(this.state.audioURI);
    TrackPlayer.play();

    this.setState({ icon: 'pause' })
  }

  render() {
    return (
      <View style={styles.container} >
        <Image
          source={require('../assets/images/music-background.gif')}
        />
        <Text style={styles.txt}> Selected Song - {this.state.audioName}</Text>
        <View style={styles.innerContainer}>
          <Icons name='add' style={styles.icon} onPress={() => this.increaseVolume()} size={80} />
          <Icons name={this.state.icon} style={styles.icon} onPress={() => this.MusicHandler()} size={80} />
          <Icons name='remove' style={styles.icon} onPress={() => this.decreaseVolume()} size={80} />
        </View>
        <FlatList
          data={this.state.audioList}
          keyExtractor={(item, index) => item.name}
          renderItem={({ item }) => {
            return (
              <View style={styles.innerContainer}>

                <Image
                  style={styles.image}
                  source={require('../assets/images/mp3.png')}
                />
                <TouchableOpacity onPress={() => {
                  this.setState({ audioURI: item.audioURI, audioName: item.name });
                  this.changeSong();
                }}>
                  <Text style={styles.txt}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ View >);
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#33FFF4',
    flex: 1,
    flexDirection: 'column',
  },
  innerContainer: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    padding: 30,
    color: "#FF9933"
  },
  txt: {
    color: '#fff',
    fontSize: 25,
  },
  image: {
    width: 100,
    height: 100
  }
});
export default AudioSongs;