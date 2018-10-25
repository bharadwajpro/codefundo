import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {editName} from '../actions/nameDialogActions'
import {connect, bindActionCreators} from 'react-redux'

const scaleAnimation = new ScaleAnimation();


export class NameDialog extends Component {
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
          dialogTitle={<DialogTitle title="Enter Your Name" />}
          actions={[
            <DialogButton
              text="Cancel"
              onPress={() => {
                this.scaleAnimationDialog.dismiss();
              }}
              key="nameDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.editName(this.props.name)
                this.scaleAnimationDialog.dismiss();
              }}
              key="nameDialogOk"
            />
          ]}
          show={this.props.nameDialogShow}
        >
          <View>
            <TextInput
              editable={true}
              placeholder='Enter your name here...'
              value={this.props.name}
              onChangeText={(name) => {this.props.name = name}}
            />
          </View>
        </PopupDialog>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
      name: state.name,
      nameDialogShow: state.nameDialogShow
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({editName}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NameDialog);
