import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import VideoSongs from '../screens/VideoSongs';
import AudioSongs from '../screens/AudioSongs';
import Home from '../screens/Home';

const AppRouter = createStackNavigator({
  Home: {
    screen: Home
  },
  VideoSongs: {
    screen: VideoSongs
  },
  AudioSongs: {
    screen: AudioSongs
  }
});

export default createAppContainer(AppRouter);

