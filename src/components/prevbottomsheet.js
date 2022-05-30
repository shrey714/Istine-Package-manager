// import {
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Text,
//   Dimensions,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {useHeaderHeight} from '@react-navigation/elements';
// import {GestureDetector, Gesture} from 'react-native-gesture-handler';
// import shortid from 'shortid';
// import Animated, {
//   Extrapolate,
//   interpolate,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from 'react-native-reanimated';
// const screenwidth = Dimensions.get('screen').width;
// const windowheight = Dimensions.get('window').height;

// const BottomSheet = props => {
//   const headerHeight = useHeaderHeight();
//   const middlemainheight = windowheight - 58 - headerHeight;
//   const MAX_TRANSLATE_Y = -middlemainheight + 50;
//   const translateY = useSharedValue(0);
//   const context = useSharedValue({y: 0});
//   const [packagedata, setpackagedata] = useState('');
//   const gesture = Gesture.Pan()
//     .onStart(() => {
//       context.value = {y: translateY.value};
//     })
//     .onUpdate(event => {
//       translateY.value = event.translationY + context.value.y;
//       translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
//     })
//     .onEnd(() => {
//       if (
//         translateY.value > -middlemainheight / 2 &&
//         translateY.value <= -middlemainheight / 9
//       ) {
//         translateY.value = withSpring(-middlemainheight / 9, {
//           damping: 50,
//         });
//       } else if (translateY.value <= -middlemainheight / 2) {
//         translateY.value = withSpring(MAX_TRANSLATE_Y, {
//           damping: 50,
//         });
//       } else if (
//         translateY.value > -middlemainheight / 9 &&
//         translateY.value <= 0
//       ) {
//         translateY.value = withSpring(-20, {
//           damping: 50,
//         });
//       } else if (translateY.value > 0) {
//         translateY.value = withSpring(-20, {
//           damping: 50,
//         });
//       }
//     });

//   const rbuttonsheetstyle = useAnimatedStyle(() => {
//     const borderRadius = interpolate(
//       translateY.value,
//       [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
//       [25, 5],
//       Extrapolate.CLAMP,
//     );
//     return {
//       borderRadius: borderRadius,
//       transform: [{translateY: translateY.value}],
//     };
//   });
//   const barwidth = useAnimatedStyle(async () => {
//     if (translateY.value <= 0 && translateY.value >= -middlemainheight / 9) {
//       const width = interpolate(
//         translateY.value,
//         [0, -middlemainheight / 9],
//         [20, 75],
//         Extrapolate.CLAMP,
//       );
//       return {
//         width: width,
//       };
//     }
//     if (
//       translateY.value < -middlemainheight / 9 &&
//       translateY.value >= MAX_TRANSLATE_Y / 2
//     ) {
//       const width = interpolate(
//         translateY.value,
//         [-middlemainheight / 9, (50 - (31 * middlemainheight) / 45) / 2],
//         [75, 40],
//         Extrapolate.CLAMP,
//       );
//       return {
//         width: width,
//       };
//     }
//     if (
//       translateY.value <= MAX_TRANSLATE_Y / 2 &&
//       translateY.value >= MAX_TRANSLATE_Y
//     ) {
//       const width = interpolate(
//         translateY.value,
//         [MAX_TRANSLATE_Y / 2, MAX_TRANSLATE_Y],
//         [40, 75],
//         Extrapolate.CLAMP,
//       );
//       return {
//         width: width,
//       };
//     }
//   });
//   const loaddata = async () => {
//     setpackagedata(await props.package);
//   };
//   useEffect(() => {
//     translateY.value = withSpring(-middlemainheight / 9, {
//       damping: 50,
//     });
//     loaddata();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <GestureDetector gesture={gesture}>
//       <Animated.View
//         style={[
//           {height: middlemainheight - 50, top: middlemainheight},
//           styles.bottomsheetcontainer,
//           rbuttonsheetstyle,
//         ]}>
//         <Animated.View style={[styles.line, barwidth]} />
//         <ScrollView
//           scrollEnabled={true}
//           showsVerticalScrollIndicator={true}
//           contentContainerStyle={styles.contentbox}>
//           {!packagedata ? (
//             <Text>loading..</Text>
//           ) : (
//             Object.keys(packagedata)
//               .reverse()
//               .map(e => {
//                 return (
//                   <TouchableOpacity
//                     onPress={async () => {
//                       translateY.value = withSpring(-middlemainheight / 9, {
//                         damping: 50,
//                       });
//                       props.navigation.navigate({
//                         name: 'Infopage',
//                         params: {
//                           packagename: props.packagename,
//                           packageversion: e,
//                         },
//                         merge: true,
//                       });
//                     }}
//                     key={shortid.generate()}
//                     style={styles.box}>
//                     <Text style={styles.text}>{e}</Text>
//                   </TouchableOpacity>
//                 );
//               })
//           )}
//         </ScrollView>
//       </Animated.View>
//     </GestureDetector>
//   );
// };

// export default BottomSheet;

// const styles = StyleSheet.create({
//   bottomsheetcontainer: {
//     width: screenwidth,
//     backgroundColor: '#fff',
//     position: 'absolute',
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   line: {
//     width: 75,
//     height: 4,
//     backgroundColor: '#900',
//     alignSelf: 'center',
//     marginVertical: 7,
//     borderRadius: 2,
//   },
//   contentbox: {
//     // flex: 1,
//     alignItems: 'center',
//   },
//   box: {
//     width: screenwidth / 1.05,
//     minHeight: 30,
//     borderRadius: 6,
//     borderWidth: 0.5,
//     borderEndColor: '#000',
//     elevation: 0,
//     backgroundColor: '#fff',
//     alignSelf: 'center',
//     marginTop: 5,
//     padding: 8,
//   },
//   text: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#000',
//   },
// });
