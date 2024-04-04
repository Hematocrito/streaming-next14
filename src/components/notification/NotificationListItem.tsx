/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  Avatar, List
} from 'antd';
import React from 'react';
import moment from 'moment';
import Router from 'next/router';

function NotificationListItem({ notification, readOne }: any) {
  console.log('Avatar ', notification);
  const redirect = () => {
    switch (notification.type) {
      case 'video':
        return Router.push(`/video/${notification.refId}`);
      case 'live':
        return Router.push({
          pathname: '/stream',
          query: {
            username: notification.refId
          }
        }, `/stream/${notification.refId}`);
      default: return null;
    }
  };

  const onClickItem = () => {
    readOne(notification);
    redirect();
  };

  return (
    <>
      <List.Item
        onClick={onClickItem}
        className={notification.read === false ? 'new-notification-unread' : 'new-notification-read'}
      >
        <List.Item.Meta
          avatar={(
            <div className="avatar-container">
              <Avatar className="notification-avatar" src={notification?.createdBy?.avatarPath || '/no-image.jpg'} />
              <div className="notification-line" />
            </div>
        )}
          title={(
            <div className="notification-title">
              <div className="message">
                <span>
                  <span className="model-user">{notification?.createdBy?.name || ''}</span>
                  &nbsp;
                  <img src="/icon-verified.png" style={{ height: 14, marginLeft: 0, marginRight: 4 }} />
                  { (notification?.type === 'feed')
                        && (notification?.action === 'create')
                        && <p style={{ display: 'inline' }}>uploaded a new post</p>}
                  {(notification?.type === 'feed')
                        && (notification?.action === 'like')
                        && <p style={{ display: 'inline' }}>liked your post</p>}
                  {(notification?.type === 'feed')
                        && (notification?.action === 'comment')
                        && <p style={{ display: 'inline' }}>commented your post</p>}
                  { (notification?.type === 'video')
                        && (notification?.action === 'create')
                        && <p style={{ display: 'inline' }}>uploaded a new video</p>}
                  {(notification?.type === 'video')
                        && (notification?.action === 'like')
                        && <p style={{ display: 'inline' }}>liked your video</p>}
                  {(notification?.type === 'video')
                        && (notification?.action === 'comment')
                        && <p style={{ display: 'inline' }}>commented your video</p>}
                  { (notification?.type === 'gallery')
                        && (notification?.action === 'create')
                        && <p style={{ display: 'inline' }}>uploaded a new gallery</p>}
                  {(notification?.type === 'gallery')
                        && (notification?.action === 'like')
                        && <p style={{ display: 'inline' }}>liked your gallery</p>}
                  {(notification?.type === 'gallery')
                        && (notification?.action === 'comment')
                        && <p style={{ display: 'inline' }}>commented your gallery</p>}
                  {(notification?.type === 'live')
                        && <p style={{ display: 'inline' }}>is live now</p>}
                  {(notification?.type != 'live')
                        ?
                      <p style={{ fontSize: '12px', marginTop: '3px', marginBottom: '-2' }}>
                        "
                        {notification.title}
                        "
                      </p>
                    : <p></p>
                  }
                </span>
              </div>
            </div>
          )}
          description={(
            <div className="notification-date">
              <span className="time"><small>{moment(notification.updatedAt).fromNow()}</small></span>
            </div>
          )}
        />
      </List.Item>
    </>
  );
}

NotificationListItem.displayName = 'NotificationListItem';

export default NotificationListItem;
