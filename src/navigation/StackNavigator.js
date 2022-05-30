// import React, {useEffect} from 'react';
// import changeNavigationBarColor from 'react-native-navigation-bar-color';
// import First from '../screens/first/First';
// import Second from '../screens/second/Second';
// import Third from '../screens/third/Third';
// import Forth from '../screens/forth/Forth';
// import Fifth from '../screens/fifth/Fifth';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   useEffect(() => {
//     changeNavigationBarColor('#ADADAD', true, true);
//   });
//   return (
//     <Stack.Navigator
//       initialRouteName="First"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#ADADAD',
//         },
//         headerTintColor: '#000',
//         headerTitleStyle: {
//           fontWeight: '200',
//           fontSize: 25,
//         },
//       }}>
//       <Stack.Screen name="First" component={First} />
//       <Stack.Screen name="Second" component={Second} />
//       <Stack.Screen name="Third" component={Third} />
//       <Stack.Screen name="Forth" component={Forth} />
//       <Stack.Screen name="Fifth" component={Fifth} />
//     </Stack.Navigator>
//   );
// };

// export default StackNavigator;
