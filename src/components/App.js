
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import SpellChecker from './SpellChecker';
import ImagePickerScreen from './ImagePickerScreen';

const AppNavigator = createStackNavigator({
  ImagePickerScreen: {
    screen: ImagePickerScreen
  },
  SpellChecker: {
    screen: SpellChecker
  }
});

export default createAppContainer(AppNavigator);