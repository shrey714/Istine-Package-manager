import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Pressable,
  Button,
  Stack,
  Heading,
  Modal,
  Divider,
  NativeBaseProvider,
  Image,
  AddIcon,
  Box,
  ScrollView,
  TextArea,
} from 'native-base';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const Sett3 = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  // =================
  const type1 = 'Report spam or abuse';
  const type2 = 'Send feedback';
  const type3 = 'Report a problem';
  const [modalVisible, setModalVisible] = useState(false);
  const [bugtype, setbugtype] = useState('please select bug type');
  const [textAreaValue, setTextAreaValue] = useState();
  const [uploadedimg, setuploadedimg] = useState([]);
  // ============
  const Showmodal = () => {
    return (
      <>
        <Modal
          safeAreaTop={true}
          isOpen={modalVisible}
          onClose={() => setModalVisible(false)}
          size="lg">
          <Modal.Content background={'#fff'}>
            <Modal.CloseButton />
            <Modal.Header>Bug type?</Modal.Header>
            <Modal.Body>
              <Stack direction="column" space={3}>
                <Pressable
                  width="100%"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setbugtype(type1);
                  }}>
                  <Heading size="xs">{type1}</Heading>
                </Pressable>
                <Divider />
                <Pressable
                  width="100%"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setbugtype(type2);
                  }}>
                  <Heading size="xs">{type2}</Heading>
                </Pressable>
                <Divider />
                <Pressable
                  width="100%"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setbugtype(type3);
                  }}>
                  <Heading size="xs">{type3}</Heading>
                </Pressable>
              </Stack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </>
    );
  };
  // ===============
  const Bugbutton = () => {
    return (
      <Box alignItems="center">
        <Pressable
          bg={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
          borderRadius={5}
          alignItems={'center'}
          paddingY={1.5}
          paddingX={5}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Heading
            color={PC === '#000' || PC === '#1F1B24' ? '#000' : '#fff'}
            size="sm">
            {bugtype}
          </Heading>
        </Pressable>
      </Box>
    );
  };
  // ==============
  const demoValueControlledTextArea = e => {
    setTextAreaValue(e.currentTarget.value);
  };
  const Inputbox = () => {
    return (
      <Box alignItems="center" w="100%">
        <TextArea
          color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
          placeholder="What would you like us to improve?"
          value={textAreaValue}
          onChange={demoValueControlledTextArea}
          size="md"
          numberOfLines={10}
          w="85%"
          marginTop={5}
          maxW="400"
          maxH="150"
        />
      </Box>
    );
  };
  // ===============
  const Uploadimg = () => {
    return (
      <Box flexDirection={'column'} w="100%">
        <Divider my={2} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          _contentContainerStyle={{
            px: '2',
          }}>
          <Button
            _pressed={{bg: 'rgba(0,0,0,0.7)'}}
            w={55}
            h={55}
            bg={TC}
            marginX={1}
            borderRadius={10}>
            <AddIcon size="6" color={TC === '#000' ? '#fff' : '#000'} />
          </Button>
          {uploadedimg.map((e, index) => (
            <Image
              w={55}
              h={55}
              key={index}
              bg={TC}
              marginX={1}
              borderRadius={10}
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
            />
          ))}
        </ScrollView>
        <Divider my={2} />
      </Box>
    );
  };
  const Submitbtn = () => {
    return (
      <Box alignItems="center" w="100%">
        <Button
          shadow={5}
          _pressed={{bg: TC}}
          bg={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
          size="md"
          w="20%">
          <Heading
            color={PC === '#000' || PC === '#1F1B24' ? '#000' : '#fff'}
            size="sm">
            Submit
          </Heading>
        </Button>
      </Box>
    );
  };
  // ==============
  return (
    <NativeBaseProvider>
      <Showmodal />
      <Bugbutton />
      <Inputbox />
      <Uploadimg />
      <Submitbtn />
    </NativeBaseProvider>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett3.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Sett3);
