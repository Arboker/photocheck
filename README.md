This is only client part. Here is server part -[https://github.com/KataScripted/photocheck](https://github.com/KataScripted/photocheck)

# JavaScript

JavaScript is a scripting or programming language that allows you to implement complex features on web pages — every time a web page does more than just sit there and display static information for you to look at — displaying timely content updates, interactive maps, animated 2D/3D graphics, scrolling video jukeboxes, etc. — you can bet that JavaScript is probably involved. It is the third layer of the layer cake of standard web technologies, two of which (HTML and CSS)

## Beginning
The first thing we need to get started with React Native is to install it. For this we need npm and android studio.

After installing npm, we will need to configure android studio. You will need to install jdk and virtual device.

After that, all we have to do is configure React Native.

## Creating project
All steps of installing react native can be found here

To create a project we need to write:

npx react-native init PhotoCheck
This will create a folder with our project and with all the necessary modules. We need to go to our folder:

```javascript
cd PhotoCheck
```

And run our application on the Android emulator:

```javascript
npx react-native run-android
```

That's all, we setted up everything we needed.

## Downloading modules
For comfortable work, we have to download several npm modules:

react-native-image-picker - you need to be able to select an image from the phone.
react-native-vector-icons - icons in the application
react-navigation - navigation between screens
react-native-gesture-handler - you need to be able to use the scrollview
For download we write:

```javascript
npm install «Modules name»
```

Then you need to link module:

```javascript
npx react-native link "Module Name"
```

To make the code work you need to drag the src folder to the directory you created.

Now we have to write the code. We already have a module that is responsible for taking images from the phone, we only need to write a function that calls this code by click.

We will get the path to the image with which we will continue to work.

We have image, and now we need to extract the text from this picture. For this we need ocr vision. We will use Microsoft Azure ocr, as it is more convenient for us.

This is a cloud ocr, but there are ocrs that are directly on the phone. But we will not use it because to work with it we will need to download the file to the phone, which is taking long time and not effective.

Others cloud ocrs are google vision and aws vision.

To get started with azure vision, we need to register there and create a key with which we will need to work.

But because the image is on the phone, we cannot just take and send to the server an image that is not located on the server.

To fix this problem, we will first send the image to them on the server, and then extract the text.

To send the image to the server we need to use FormData. We create a variable and assign new FormData() to it. Now in the variable we add a link to the image and type of image. That's all.

Now we send the data to the server using the fetch method.

In the end, we get the answer in the form of json, which we iterate over using map and Array.from, and we get the finished extracted text.

Our next step is to check the text for mistakes. Here we need react-navigation. So that a person can see the corrected text, he will have to go to a new page. This is what react-navigation does.

We will send the extracted text to a new file, in this file we will take this text.

The text correction process will be performed by the server, and we only need to send data to it.

We will also use the fetch method to send data to the server.

After successful sending, we will receive a corrected text. Then this text we will append to variable. In return we will call this variable.

It remains for us to add animations, design and icons.

## Thats all! Now we have app that corrects text from image!
