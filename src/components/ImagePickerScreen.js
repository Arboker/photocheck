import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntIcon from "react-native-vector-icons/AntDesign";
import { 
  AdMobBanner, 
  AdMobInterstitial, 
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'

const Button = (Platform.OS === 'android') ? TouchableNativeFeedback : TouchableOpacity;
const options = {
  quality: 1.0,
  maxWidth: 300,
  maxHeight: 300,
  storageOptions: {
    skipBackup: true,
  },
};


class ImagePickerScreen extends Component {
  static navigationOptions = {
    title: 'Text Detection',
  };

  constructor(props) {
    super(props);
    this.state = {
      imageSource: null,
      text: '',
      data: [],
      buttonShow: false,
      loading: false,
      textAreaVisibile: false,
      newImage: null
    };
    this.selectImage = this.selectImage.bind(this);
  }

  selectImage() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        this.setState({ imageSource: source });
       
        this.setState({
          loading: true
        })

        console.log(response.type)
        // You can also display the image using data:
  
        this.extractText(response.uri, response.type);

      }
    });
   
  }

  extractText = async (imageSource, imageType) => {

  
   
    let subscriptionKey = ['YOUR_SUBSCRIPTIONKEY'];
    let endpoint = ['YOUR_ENDPOINT']
    if (!subscriptionKey) { throw new Error('Set your environment variables for your subscription key and endpoint.'); }
    
    var uriBase = endpoint + "vision/v2.1/ocr";

    // Request parameters.
 

    // Display the image.
    var sourceImageUrl = imageSource;
    const data = new FormData();
    data.append('photo', {
      uri: imageSource,
      type: imageType, // or photo.type
      name: 'testPhotoName'
    });
   
    fetch(uriBase,
{
 
 method: 'POST',
 headers: 
 {
  'Content-Type': 'multipart/form-data',
     'Ocp-Apim-Subscription-Key': subscriptionKey,
 },
 body: data,


}).then((response) => response.json()).then((data) =>
{

  const responseData = JSON.stringify(data, null, 2);

  const parsed = JSON.parse(responseData);

  var array = [];

  parsed.regions.map(item => {
      item.lines.map(el => {
          el.words.map(word => {
              array = array.concat(word.text);
          })
      })
  })

const newData = Array.from(array, x => x).join(' ');


  this.setState({
    text: newData,
    loading: false,
    buttonShow: true
  })



}).catch((error) =>
{
 
  console.log(error)

});
  };


remove() {
  this.setState({
    text: '',
    imageSource: null,
    buttonShow: false,
    textAreaVisibile: false
  })
}

onChangeText(newText) {
  this.setState({
    text: newText
  })
}




  render() {
    const { imageSource } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
      <ScrollView>
      <View style={styles.container}>
      { this.state.imageSource == null ? (
        <View>
         <Button onPress={this.selectImage} >
          <View style={[styles.image, styles.imageContainer, !imageSource && styles.rounded]}>
              <Text>Choose picture</Text>
          </View>
        </Button>
    </View>
        ) : (
 <Image style={styles.image} source={imageSource} />
        )}
        
  <View style={{paddingTop: 15}}>
    {this.state.loading === true ? (
       <View>
       <ActivityIndicator size="large" color="#1479d9" />
     </View>
    ) : (
      <View>

         {this.state.textAreaVisibile == true ? (
  <View style={styles.textAreaContainer} >
    <TextInput
    style={{fontSize:18}}
       onChangeText={newText => this.onChangeText(newText)}
       value={this.state.text}
      multiline={true}
      autoFocus={true}
    />
  </View>
) : (
  <View>
     <Text style={{fontSize:18}}>{this.state.text}</Text>
    </View>
)}
      </View>
    )}
  </View>
           
      </View>

{this.state.imageSource == null ? (
  <View style={{ justifyContent: 'center',
  alignItems: 'center',}}>
    <AdMobBanner
adSize="mediumRectangle"
adUnitID="ca-app-pub-3371284819677164/2245308596"
testDevices={[AdMobBanner.simulatorId]}
onAdFailedToLoad={error => console.error(error)}
/>
</View>
) : (
  <View></View>
)}


      </ScrollView>


      {
         
          this.state.buttonShow === true ? (
           <View style={{ margin: 20, position: 'absolute', bottom: 0, right: 0, flexDirection: 'row'}}>

{this.state.textAreaVisibile == false ? (
  <AntIcon name='edit' style={{backgroundColor:'#1479d9', fontSize: 32, color: 'white',
  padding: 10, borderRadius: 50, marginRight: 8}} onPress={() => {
    this.setState({
      textAreaVisibile: true
    })
   }}/>
) : (
  <View></View>
)}

<AntIcon name='close' style={{backgroundColor:'#1479d9', fontSize: 32, color: 'white',
        padding: 10, borderRadius: 50, marginRight: 8}} onPress={() => {
          this.remove();
         }}/>

 <AntIcon name='arrowright' style={{backgroundColor:'#1479d9', fontSize: 32, color: 'white',
        padding: 10, borderRadius: 50}} onPress={() => {
          const data = this.state.text;
          this.props.navigation.navigate("SpellChecker", {
            text: data
          });
        }}/>
           
                 </View>
            ) : (
              <View></View>
            )
            }


  

</View>
    );
  }
}

const styles = StyleSheet.create({
  textAreaContainer: {
    width: '100%'
  },
  button: {
    margin: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding:10,
    marginTop: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  imageContainer: {
    borderColor: 'silver',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 150,
    height: 150,
  },
  rounded: {
    borderRadius: 75,
  },
  textButton: {
    backgroundColor: '#1479d9',
    color: 'white',
    padding: 10,
    borderRadius: 4,
    fontSize: 16
  }
});

export default ImagePickerScreen;