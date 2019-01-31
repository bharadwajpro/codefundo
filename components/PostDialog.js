import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Keyboard, Platform} from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {newPost, hidePostDialog} from '../actions/postDialogActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const scaleAnimation = new ScaleAnimation();


export class PostDialog extends Component {
  state = {inputPost: ''}

  showScaleAnimationDialog = () => {
    this.scaleAnimationDialog.show();
  }

  render() {
    return (
      <View 
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: (Platform.OS === 'ios' && this.props.postDialogShow) ? 2:undefined}}
      >
        {/* <View style={styles.container}>
          <DialogButton
            text="Name"
            onPress={this.showScaleAnimationDialog}
          />
        </View> */}

        <PopupDialog
          ref={(popupDialog) => {
            this.scaleAnimationDialog = popupDialog;
          }}
          dialogAnimation={scaleAnimation}
          dialogTitle={<DialogTitle title="New Post" />}
          actions={[
            <DialogButton
              text="Cancel"
              onPress={() => {
                this.props.hidePostDialog();
                this.textInput.clear();
                Keyboard.dismiss;
              }}
              key="postDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.newPost(this.props.name, this.state.inputPost, this.props.posts)
                this.props.hidePostDialog();
                this.textInput.clear();
                Keyboard.dismiss;
              }}
              key="postDialogOk"
            />
          ]}
          show={this.props.postDialogShow}
          dismissOnTouchOutside={false}
          dismissOnHardwareBackPress={false}
        >
          <View>
            <TextInput
              ref={(textInput) => this.textInput = textInput}
              editable={true}
              placeholder='New post here...'
              onChangeText={(inputPost) => {this.setState({inputPost})}}
            />
          </View>
        </PopupDialog>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
      postDialogShow: state.postDialogShow,
      name: state.name,
      posts: state.posts
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({newPost, hidePostDialog}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PostDialog);
