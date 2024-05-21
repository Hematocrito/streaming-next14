/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { Modal, Tooltip, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { IPerformer } from 'src/interfaces';
//import { Event } from 'src/socket';
import Link from 'next/link';
import { BsShareFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { HomeListingTranslations } from './home-listing-translations';
import Image from 'next/image';
import { url } from 'inspector';
//  import { StreamIcon } from '@components/streaming/live-stream-icon';

interface IProps {
  performer: IPerformer;
  linkToLiveStream?: boolean;
}

interface IShareModalProps {
  performer: IPerformer
}

function ShareModalContent({ performer }: IShareModalProps) {
  const router = useRouter();
  const { locale } = router;

  const translations = locale === '' ? HomeListingTranslations['en-US'] : HomeListingTranslations['es-ES'];

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.href}model/${performer.username}`);
      message.success('Link has been copied to clipboard!');
    } catch (e) {
      message.error(
        'Error while coping the link, please copy link from browser directly!'
      );
    }
  };

  return (
    <div style={{ paddingTop: 8, paddingBottom: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Image
          height={30}
          width={30}
          style={{
            borderRadius: '50%',
            objectFit: 'cover'
          }}
          alt="Avatar"
          src={'/img/beso-grande.jpg'}
        />
        <span style={{
          fontSize: 16, fontWeight: 'bolder', marginTop: 4, marginLeft: 4, color: 'black'
        }}
        >
          @
          {performer?.username}
        </span>
        <Image src="/img/icon-verified.png" height={20} width={20} style={{ marginLeft: 4, marginTop: 6 }} alt="" />
      </div>
      <div
        style={{
          borderTop: '1px solid rgb(199 199 199)', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 8
        }}
        onClick={onShare}
      >
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <BsShareFill color="#0cecf8" fontSize={18} style={{ marginTop: 12 }} />
        </div>
        <span style={{
          fontSize: 14, fontWeight: 'bolder', marginTop: 12, marginLeft: 16, color: 'black'
        }}
        >
          {translations.shareProfileBtn}
        </span>
      </div>
    </div>
  );
}

export function PerformerCard({
  performer,
  linkToLiveStream = false
}: IProps) {
  const [online, setOnline] = useState(performer.isOnline);
  const [showShareModal, setShowShareModal] = useState(false);

  const href = linkToLiveStream ? {
    pathname: '/stream',
    query: { username: performer?.username || performer?._id }
  } : {
    pathname: '/model/profile',
    query: { username: performer?.username || performer?._id }
  };
  const as = linkToLiveStream ? `/stream/${performer?.username || performer?._id}` : `/model/${performer?.username || performer?._id}`;

  return (
    <>
      <Link
        legacyBehavior
        href={'/stream'}
        as={`/stream/${performer?.username || performer?._id}`}
      >
        <a>
          <div className='model-card' style={{ backgroundImage: `url(/img/imagen5.jpg)` }}>
          {performer.streamingStatus === 'public' && (
            <Image
              src="/img/live-rosa.png"
              alt=""
              className="live"
            />
            )}
          {performer.streamingStatus === 'private' && (
            <Image
              src="/live-rojo.png"
              alt=""
              className="live"
            />
            )}  
            <Tooltip title={performer?.name || performer?.username}>
              <Image
                className="avatar"
                alt="Avatar"
                src={'/img/beso-grande.jpg'}
                width={100}
                height={100}
              />
              {performer.streamingStatus !== 'private' && performer.streamingStatus !== 'public' && online === 1 && (<span className="online-status active" />)}
              <div className="model-name" />
              <div className="model-username-wrapper">
                <span>{performer?.name || performer?.username || 'N/A'}</span>
                <Image src="/img/icon-verified.png" width={16} height={16} style={{ height: 16, marginLeft: 3 }} alt="" />
                <br />
                <span className="model-username">
                  @
                  {performer?.username}
                  {' '}
                </span>
              </div>
            </Tooltip>     

            <div className="feed-top-right">
              <MoreOutlined onClick={(e) => {
                e.preventDefault();
                setShowShareModal(true);
              }}
              />
            </div>     
          </div>
        </a>
      </Link>
      <Modal
        width={275}
        open={showShareModal}
        footer={null}
        onCancel={() => setShowShareModal(false)}
        className="shareModal"
      >
        <ShareModalContent performer={performer} />
      </Modal>
    </>
  );
}

PerformerCard.defaultProps = {
  linkToLiveStream: false
};

export default PerformerCard;
