import React from 'react';
import RN, { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { Container, Content, Text, View, Icon, Header } from 'native-base';
import RenderHtml from 'react-native-render-html';
import { SvgXml } from 'react-native-svg';

import { Loading } from '@Components';
import { Colors, Svgs } from '@Theme';
import { OBIDetailProps } from './types';
import styles, { scale, deviceWidth } from './styles';

const ObiDetail: React.FC<OBIDetailProps> = props => {
  const { obiData } = props?.route?.params;
  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const replaceText = (dataString: string) => {
    const string = dataString.replace(/<br \/>/gi, '');
    return string;
  };
  function mapStringToComponent(stringToRender: string) {
    const parseResult = stringToRender.match(/<([a-z]*)>(.*)<\/[a-z]*>/i);
    // result of this regex ["<Text>hello</Text>", "Text", "hello"]
    console.log('parseResult=======>', parseResult);

    if (parseResult !== null) {
      const [, compName, innerText] = parseResult;

      return React.createElement(
        RN[compName],
        null, // here may be an object with attributes if your node has any
        innerText
      );
    }

    return null;
  }
  const renderHTML = () => {
    const htmlCode = obiData.fullText.trim();
    const renderCode = replaceText(htmlCode);
    console.log('=-----', renderCode);
    return (
      <View style={styles.detailView}>
        <Text>{renderCode}</Text>
      </View>
    );
  };
  return (
    <Container style={styles.background}>
      <Header
        style={styles.header}
        iosBarStyle={'light-content'}
        androidStatusBarColor={Colors.green}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerLeft}>
          <Icon
            type="SimpleLineIcons"
            name="arrow-left"
            style={styles.backIcon}
          />
          <Text style={styles.headerText}>ROI Says</Text>
        </TouchableOpacity>
        <SvgXml
          xml={Svgs.obiWhiteIcon}
          width={38 * scale}
          height={38 * scale}
        />
      </Header>
      <View style={styles.detailHeader}>
        <View style={styles.detailListNumber}>
          <Text style={styles.detailListNumberText}>{obiData.order}</Text>
        </View>
        <Text style={styles.detailTitle}>{obiData?.title}</Text>
      </View>
      {Object.keys(obiData).length > 0 ? (
        <Content contentContainerStyle={styles.contentView}>
          <View style={styles.descView}>
            {renderHTML()}
            {/* <RenderHtml
              contentWidth={deviceWidth}
              source={{
                html: obiData.fullText.trim()
              }}
            /> */}
          </View>
        </Content>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default ObiDetail;
