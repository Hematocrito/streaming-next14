import React from 'react';
import { Modal, Alert } from 'antd';
import Form from './form';

interface TippingModalProps {
  visible: boolean;
  submiting: boolean;
  error: boolean;
  errorMessage: string;
  sendTip: Function;
  cancle: any;
  avatarPath: string;
  name: string;
  username: string;
}

function TippingModal({
  visible, sendTip, cancle, error, errorMessage, submiting, avatarPath, name, username
}: TippingModalProps) {
  const [amount, setAmount] = React.useState(0);
  const onOK = () => {
    sendTip(amount);
  };

  const onChange = (data: any) => {
    setAmount(data.amount);
  };

  return (
    <Modal
      visible={visible}
      onOk={onOK}
      onCancel={cancle}
      confirmLoading={submiting}
      destroyOnClose
    >
      <div className="profile-user">
        <img
          src={avatarPath || 'https://cdn.the-models.de/storage/app/uploads/public/612/f6d/87a/thumb_550718_326_489_0_0_crop.jpeg' || '/no-avatar.png'}
          alt="avatar"
          className="avatar-in-drawer"
          style={{
            marginTop: '20px'
          }}
        />
        <a className="profile-name">
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'black'
          }}
          >
            {name || 'N/A'}
            <img alt="" src="/icon-verified.png" style={{ border: 'none', width: 20, height: 18 }} />
          </div>
          <span style={{ color: 'black', fontWeight: 'normal' }}>
            @
            {username || 'n/a'}
          </span>
        </a>
      </div>
      {error && <Alert type="error" message={errorMessage} showIcon />}
      <Form onChange={onChange} />
    </Modal>
  );
}

export default TippingModal;
