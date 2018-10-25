import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {newPost} from '../actions/postDialogActions'
import {connect, bindActionCreators} from 'react-redux'

const scaleAnimation = new ScaleAnimation();


export class PostDialog extends Component {
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
                this.scaleAnimationDialog.dismiss();
              }}
              key="postDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.newPost(this.props.name, this.props.post, this.props.posts)
                this.scaleAnimationDialog.dismiss();
              }}
              key="postDialogOk"
            />
          ]}
          show={this.props.postDialogShow}
        >
          <View>
            <TextInput
              editable={true}
              placeholder='New post here...'
              onChangeText={(post) => {this.props.post = post}}
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
  return bindActionCreators({newPost}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(PostsDialog);
