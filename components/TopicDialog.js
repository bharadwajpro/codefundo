import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {editTopic} from '../actions/topicDialogActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'


const scaleAnimation = new ScaleAnimation();


export class TopicDialog extends Component {
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.scaleAnimationDialog.show()
  //   }, 5000)
  // }

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
                this.scaleAnimationDialog.dismiss();
              }}
              key="topicDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.editTopic(this.props.topic)
                this.scaleAnimationDialog.dismiss();
              }}
              key="topicDialogOk"
            />
          ]}
          show={this.props.topicDialogShow}
        >
          <View>
            <TextInput
              editable={true}
              placeholder='Enter topic name here...'
              value={this.props.topic}
              onChangeText={(topic) => {this.props.topic = topic}}
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
  return bindActionCreators({editTopic}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TopicDialog);
