import {
  Button, Input, message, Radio, RadioChangeEvent, Modal
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ISettings, IUser } from 'src/interfaces';
import { paymentWalletService } from '@services/payment-wallet.service';
import { WalletTranslations } from 'src/pages-translations/wallet-translations';

// import './topup-wallet.less';

export interface ITopupWalletModal {
  settings?: ISettings;
  currentUser?: IUser;
  visible: boolean;
  onClose: Function;
  locale: any;
}

function TopupWalletModal({
  settings,
  currentUser,
  visible,
  onClose,
  locale
}: ITopupWalletModal) {
  //const transWallet = locale === '' ? WalletTranslations['en-US'] : WalletTranslations[locale];
  const transWallet = WalletTranslations['en-US'];
  const [open, setOpen] = useState(visible);
  const [inputVal, setInputVal] = useState(1);
  const [radioVal, setRadioVal] = useState(
    (settings?.ccbillEnabled && 'ccbill')
      || (settings?.verotelEnabled && 'verotel')
  );
  const [loading, setLoading] = useState(false);
  const exceptThisSymbols = ['e', 'E', '+', '-'];
  const incLists = [
    {
      key: '10',
      value: 10
    },
    {
      key: '50',
      value: 50
    },
    {
      key: '100',
      value: 100
    }
  ];
  const inputEl = useRef(null);

  useEffect(() => {
    if (!inputEl.current) return;

    inputEl.current.focus();
  }, [inputEl]);

  useEffect(() => {
    if (visible) setOpen(true);
  }, [visible]);

  const handleInputChange = (e:any) => {
    setInputVal(e);
  };

  const handleRadioGroupChange = (e: RadioChangeEvent) => {
    setRadioVal(e.target.value);
  };

  const handleIncrementClick = (value:any) => {
    setInputVal(Number(inputVal) + value);
  };

  const submit = async () => {
    try {
      setLoading(true);
      const resp = await paymentWalletService.purchaseWallet({
        amount: Number(inputVal),
        paymentGateway: radioVal,
        countryCode: 'CO',
        currency: 'USD'
      });
      if (['astropay', 'ccbill'].includes(radioVal)) { window.location.href = resp.data.paymentUrl; }
    } catch (e) {
      const err = await e;
      message.error(err.message[0]);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setOpen(false);
    onClose();
  };

  return (
    <Modal
      className="modal-wallet__popup"
      visible={open}
      onCancel={onCancel}
      destroyOnClose
      footer={null}
    >
      <div className="modal-wallet">
        <div className="modal-wallet__header">
          <img src="/loading-wallet-icon.png" alt="" width="23" height="23" />
          <p>{transWallet.topup}</p>
        </div>
        <div className="modal-wallet__body">
          <div className="wallet-body__input">
            <Input
              min={1}
              prefix="$"
              type="number"
              value={inputVal}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
              ref={inputEl}
            />
          </div>

          <div className="wallet-body__increment">
            <p className="increment__plus">+</p>
            {incLists.map((incList) => (
              <Button
                className="increment__btn"
                value={incList.value}
                key={incList.key}
                onClick={() => handleIncrementClick(incList.value)}
              >
                +
                {incList.value}
              </Button>
            ))}
          </div>

          <div className="wallet-body__radio">
            <Radio.Group onChange={handleRadioGroupChange} value={radioVal}>
              <Radio value="astropay">
                <img src="/astropay_logo_black.svg" height="18px" alt="Astropay" />
              </Radio>
              <Radio value="ccbill">
                <img src="/ccbill-ico.png" height="25px" alt="Ccbill" />
              </Radio>
            </Radio.Group>
          </div>

          <div className="wallet-body__submit">
            <Button onClick={submit} disabled={loading}>
              {transWallet.proceed}
            </Button>
          </div>
        </div>

        <div className="modal-wallet__footer">
          <div className="wallet-footer__current">
            <p className="title">{transWallet.balance}</p>
            <h1 className="balance">
              $
              {(currentUser?.balance || 0).toFixed(2)}
            </h1>
          </div>
        </div>
      </div>
    </Modal>
  );
}

TopupWalletModal.defaultProps = {
  currentUser: null,
  settings: {}
};

const mapStates = (state: any) => ({
  settings: { ...state.settings },
  currentUser: state.user.current
});

export default connect(mapStates)(TopupWalletModal as any);
