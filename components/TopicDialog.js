import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {editTopic, hideTopicDialog} from '../actions/topicDialogActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


const scaleAnimation = new ScaleAnimation();


export class TopicDialog extends Component {
  state = {inputTopic: ''}

  componentDidMount() {
    this.setState({inputTopic: this.props.topic})
    this.textInput.value = this.props.topic
  }

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  render() {
    return (
      <View 
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}
      >
        {/* <View style={styles.container}>
          <DialogButton
            text="News"
            onPress={this.showScaleAnimationDialog}
          />
        </View> */}

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="Enter Topic Name" />}
          actions={[
            <DialogButton
              text="Cancel"
              onPress={() => {
                this.props.hideTopicDialog();
              }}
              key="topicDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.editTopic(this.state.inputTopic)
                this.props.hideTopicDialog();
              }}
              key="topicDialogOk"
            />
          ]}
          show={this.props.topicDialogShow}
          dismissOnTouchOutside={false}
          dismissOnHardwareBackPress={false}
        >
          <View>
            <TextInput
              ref={(textInput) => this.textInput = textInput}
              editable={true}
              placeholder='Enter topic name here...'
              onChangeText={(inputTopic) => {this.setState({inputTopic})}}
            />
          </View>
        </PopupDialog>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      topic: state.topic,
      topicDialogShow: state.topicDialogShow
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({editTopic, hideTopicDialog}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TopicDialog);
