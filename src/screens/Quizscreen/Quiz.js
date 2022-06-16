/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import QuizData from './QuizData';
const {width, height} = Dimensions.get('window');
const Quiz = ({route, colorlist, navigation}) => {
  const {name, bg} = route.params;
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const allQuestions = QuizData;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const renderQuestion = () => {
    return (
      <View
        style={{
          marginBottom: 20,
          borderWidth: 3,
          padding: 10,
          borderRadius: 20,
          borderColor: TC + '40',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {/* Question Counter */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            backgroundColor: 'rgba(255,255,255,0.6)',
            alignSelf: 'flex-start',
            paddingVertical: 5,
            paddingHorizontal: 8,
            borderRadius: 8,
            marginVertical: 5,
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
            }}>
            {currentQuestionIndex + 1}
          </Text>
          <Text style={{color: '#000', fontSize: 18, opacity: 0.6}}>
            / {allQuestions.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            backgroundColor: 'rgba(255,255,255,0.6)',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View
        style={{
          borderWidth: 3,
          padding: 10,
          borderRadius: 20,
          borderColor: TC + '40',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderRadius: 10,
              backgroundColor:
                option === correctOption
                  ? 'rgba(0,200,81,0.6)' + '20'
                  : option === currentOptionSelected
                  ? 'rgba(255,68,68,0.6)' + '20'
                  : 'rgba(255,255,255,0.6)',
              height: 55,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text style={{fontSize: 20, color: '#000'}}>{option}</Text>

            {/* Show Check Or Cross Icon based on correct answer*/}
            {option === correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#00C851',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="check" size={23} color={'#000'} />
              </View>
            ) : option === currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#ff4444',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="times" size={23} color={'#000'} />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Animatable.View
          animation="fadeIn"
          duration={300}
          useNativeDriver={true}>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 25,
              width: '50%',
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 9,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: TC + '40',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 7,
              }}>
              <Text
                style={{
                  fontSize: 27,
                  color: '#000',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };

  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 26,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: TC + 40,
          marginBottom: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: SC,
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
      }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        animated={true}
      />
      <SharedElement id={`item.${name}.image_url`}>
        <ImageBackground
          imageStyle={{width, height}}
          source={bg}
          resizeMode={'cover'}
          style={StyleSheet.absoluteFillObject}
          blurRadius={2}
        />
      </SharedElement>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: getStatusBarHeight(),
          position: 'relative',
        }}>
        {/*main screen*/}
        <Animatable.View
          animation="slideInDown"
          duration={800}
          useNativeDriver={true}>
          {/* ProgressBar */}
          {renderProgressBar()}
        </Animatable.View>
        <Animatable.View
          animation="zoomIn"
          duration={800}
          useNativeDriver={true}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Question */}
            {renderQuestion()}

            {/* Options */}
            {renderOptions()}

            {/* Next Button */}
            {renderNextButton()}
          </ScrollView>
        </Animatable.View>
        {/* Score Modal */}
        <Modal
          animationType="fade"
          statusBarTranslucent={true}
          transparent={true}
          visible={showScoreModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              // hardwareAccelerated: true,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: PC,
                width: '90%',
                elevation: 8,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                }}>
                {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color:
                      score > allQuestions.length / 2 ? '#00C851' : '#ff4444',
                  }}>
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                  }}>
                  / {allQuestions.length}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={restartQuiz}
                style={{
                  backgroundColor: SC,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: TC === '#000' ? '#fff' : '#000',
                    fontSize: 20,
                  }}>
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Quiz.prototype = {
  colorlist: propTypes.object.isRequired,
};

Quiz.sharedElements = route => {
  const {name, bg} = route.params;
  return [
    {
      id: `item.${name}.image_url`,
      animation: 'move',
      resize: 'auto',
    },
  ];
};

export default connect(mapStateToProps)(Quiz);
