import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation';

class VideoSongs extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: true,
      playerState: PLAYER_STATES.PAUSED,
      screenType: 'cover',
      videoUri: '../assets/videos/sample.mp4',
      orientation: 'portrait',
      videoList: [
        { name: 'Video', videoURI: '../assets/videos/sample.mp4', thumbnailURI: '../assets/images/video-thumbnail.jpg' },
        { name: 'Video1', videoURI: '../assets/videos/sample1.mp4', thumbnailURI: '../assets/images/video-thumbnail.jpg' },
        { name: 'Video2', videoURI: '../assets/videos/sample2.mp4', thumbnailURI: '../assets/images/video-thumbnail.jpg' },
        { name: 'Video3', videoURI: '../assets/videos/sample3.mp4', thumbnailURI: '../assets/images/video-thumbnail.jpg' },
        { name: 'Video4', videoURI: '../assets/videos/sample4.mp4', thumbnailURI: '../assets/images/video-thumbnail.jpg' },
      ],
    };
  }

  onSeek = seek => {
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const { isLoading, playerState } = this.state;
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = data => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = () => Alert.alert('Oh! ', error);

  onFullScreen = () => {

    if (this.state.orientation === 'portrait') {
      this.setState({ orientation: 'landscape' });
      Orientation.lockToLandscape();
    }
    else {
      this.setState({ orientation: 'portrait' });
      Orientation.lockToPortrait()
    };
  };

  onSeeking = currentTime => this.setState({ currentTime });
  get videoURI() {
    switch (this.state.videoURI) {
      case '../assets/videos/sample.mp4':
        return require('../assets/videos/sample.mp4');
      case '../assets/videos/sample1.mp4':
        return require('../assets/videos/sample1.mp4');
      case '../assets/videos/sample2.mp4':
        return require('../assets/videos/sample2.mp4');
      case '../assets/videos/sample3.mp4':
        return require('../assets/videos/sample3.mp4');
      case '../assets/videos/sample4.mp4':
        return require('../assets/videos/sample4.mp4');
      default:
        return require('../assets/videos/sample1.mp4');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mediaPlayer}>
          <Video
            onEnd={this.onEnd}
            onLoad={this.onLoad}
            onLoadStart={this.onLoadStart}
            onProgress={this.onProgress}
            paused={this.state.paused}
            ref={videoPlayer => (this.videoPlayer = videoPlayer)}
            resizeMode={this.state.screenType}
            onFullScreen={this.state.isFullScreen}
            source={this.videoURI}
            style={styles.mediaPlayer}
            volume={10}
          />
        </View>
        <View style={styles.MediaControls}>
          <MediaControls
            duration={this.state.duration}
            isLoading={this.state.isLoading}
            mainColor="#333"
            onFullScreen={this.onFullScreen}
            onPaused={this.onPaused}
            onReplay={this.onReplay}
            onSeek={this.onSeek}
            onSeeking={this.onSeeking}
            playerState={this.state.playerState}
            progress={this.state.currentTime}

          />
        </View>
        <SafeAreaView style={styles.flatList}>
          <FlatList
            data={this.state.videoList}
            keyExtractor={(item, index) => item.name}
            renderItem={({ item }) => {
              return (
                <View style={styles.innerContainer}>
                  <Image
                    style={styles.image}
                    source={require('../assets/images/video-thumbnail.jpg')}
                  />
                  <TouchableOpacity onPress={() => {
                    this.setState({ videoURI: item.videoURI })
                  }}>
                    <Text style={styles.txt}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </SafeAreaView>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  innerContainer: {
    backgroundColor: '#33FFF4',
    flexDirection: 'row'
  },
  MediaControls: {
    height: 320,
  },
  flatList: {
    flex: 1
  },
  txt: {
    color: '#fff',
    fontSize: 30,
    alignSelf: 'center',
    marginLeft: 80
  },
  image: {
    width: 100,
    height: 100
  }
});
export default VideoSongs;