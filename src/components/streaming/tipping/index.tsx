/* eslint-disable react/require-default-props */
import React from 'react';
import { Button, message } from 'antd';
import { paymentWalletService } from 'src/services';
import { getResponseError } from '@lib/utils';
import { IUser } from '@interfaces/user';
import Router from 'next/router';
import Modal from './modal';

interface TippingProps {
  performerId: string;
  avatar: string;
  name: string;
  username: string;
  usuario: IUser;
}

interface TippingStates {
  visible: boolean;
  submiting: boolean;
  error: boolean;
  errorMessage: string;
}

class TipPhoto extends React.PureComponent<TippingProps, TippingStates> {
  constructor(props: TippingProps) {
    super(props);
    this.state = {
      visible: false,
      submiting: false,
      error: false,
      errorMessage: ''
    };
  }

  onCancle() {
    this.setState({ visible: false });
  }

  submit() {
    const { usuario } = this.props;
    if (!usuario._id) {
      message.error(
        'You can send tip to a model just as soon as you login/register.’'
      );
      Router.push('/auth/login');
      return;
    }

    this.setState({ visible: true });
  }

  async sendTip(amount:any) {
    try {
      const { performerId } = this.props;
      this.setState({ submiting: true });
      await paymentWalletService.sendTip(performerId, { amount });
      this.setState({
        visible: false,
        error: false,
        errorMessage: ''
      });
    } catch (e) {
      const error = await Promise.resolve(e);
      this.setState({ error: true, errorMessage: getResponseError(error) });
    } finally {
      this.setState({ submiting: false });
    }
  }

  render() {
    const {
      performerId, avatar, name, username
    } = this.props;
    return (
      <>
        <Button
          className="tertiary profile-btn"
          onClick={this.submit.bind(this)}
          disabled={!performerId}
          block
        >
          Send Tip
        </Button>
        <Modal
          {...this.state}
          sendTip={this.sendTip.bind(this)}
          cancle={this.onCancle.bind(this)}
          avatarPath={avatar}
          name={name}
          username={username}
        />
      </>
    );
  }
}

export default TipPhoto;
