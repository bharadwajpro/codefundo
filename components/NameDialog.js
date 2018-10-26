import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {editName, hideNameDialog} from '../actions/nameDialogActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

const scaleAnimation = new ScaleAnimation();


export class NameDialog extends Component {
  state = {inputName: ''}

  componentDidMount() {
    this.setState({inputName: this.props.name})
    this.textInput.value = this.props.name
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
                this.props.hideNameDialog();
              }}
              key="nameDialogCancel"
            />,
            <DialogButton
              text="Ok"
              onPress={() => {
                this.props.editName(this.state.inputName)
                this.props.hideNameDialog();
              }}
              key="nameDialogOk"
            />
          ]}
          show={this.props.nameDialogShow}
          dismissOnTouchOutside={false}
          dismissOnHardwareBackPress={false}
        >
          <View>
            <TextInput
              ref={(textInput) => this.textInput = textInput}
              editable={true}
              placeholder='Enter your name here...'
              onChangeText={(inputName) => {this.setState({inputName})}}
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
  return bindActionCreators({editName, hideNameDialog}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NameDialog);
