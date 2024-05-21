/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import {
  Menu, Row, Col, Button, Avatar
} from 'antd';
import Link from 'next/link';
// import './NotificationHeaderMenu.less';
import Router, { useRouter } from 'next/router';
import moment from 'moment';
import { headerContent } from '@components/common/layout/header';

function NotificationHeaderMenu({ notifications, readAll, readOne }: any) {
  const { pathname, locale } = useRouter();
  let h = headerContent['en-US'];
  let options;

  if (typeof (h) === 'undefined') {
    h = headerContent['en-US'];
    options = h.options;
  } else {
    options = h.options;
  }

  const redirect = (notification:any) => {
    console.log('RefUser ', notification.createdBy.username);
    switch (notification.type) {
      case 'gallery':
        return Router.push({
          pathname: '/gallery',
          query: {
            id: notification.refId
          }
        }, `/gallery/${notification.refId}`);
      case 'feed':
        return Router.push({
          pathname: '/post',
          query: {
            id: notification.refId
          }
        }, `/post/${notification.refId}`);
        case 'live':
          return Router.push({
            pathname: '/stream',
            query: {
              username: notification.createdBy.username
            }
          }, `/stream/${notification.createdBy.username}`);
      case 'video':
        return Router.push({
          pathname: '/video',
          query: {
            id: notification.refId
          }
        }, `/video/${notification.refId}`);
      
      default: return null;
    }
  };

  const onClickItem = (notification:any) => {
    readOne(notification);
    redirect(notification);
  };

  return (
    <Menu title={options.notifications.tooltip} className="notification-menu" style={{ width: '100%' }}>
      <Menu.ItemGroup
        title={(
          <span>
            {options.notifications.tooltip}
            <Button className="btn-dismiss-read-all" onClick={readAll}>
              {options.notifications.markAsRead}
            </Button>
            <Link legacyBehavior href={pathname === '/notification' ? '#' : '/notification'}>
              <a style={{ marginTop: '6px' }}>{options.notifications.seeAll}</a>
            </Link>
          </span>
        )}
      >
        {notifications && notifications.length > 0 ? (
          notifications.map((notification:any) => (
            <Menu.Item
              onClick={() => onClickItem(notification)}
              key={notification._id}
              className={!notification.read ? 'notification-unread' : 'notification-read'}
            >
              <Row gutter={{ md: 4, lg: 4 }} className="notification-item">
                <Col md={3} lg={8}>
                  <div style={{
                    display: 'flex', flexDirection: 'row', gap: '12px'
                  }}
                  >
                    <Avatar src={notification?.createdBy?.avatarPath || '/no-image.jpg'} className="notification-avatar" />
                    <div className="notification-line" />
                  </div>
                </Col>
                <Col md={21} lg={16}>
                  <div className="notification-item-list">
                    <div className="message">
                      <span>
                        <span style={{ fontWeight: 'bolder' }}>{notification?.createdBy?.name || ''}</span>
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
                      </span>
                    </div>
                    { (notification?.type != 'live') &&
                      <p style={{ fontSize: '10px', marginBottom: '3px' }}>
                        "
                        {notification.title}
                        "
                      </p>}
                    <span className="time" style={{ fontSize: '8px' }}>{moment(notification.updatedAt).fromNow()}</span>
                  </div>
                </Col>
              </Row>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item key="no-notification">{options.notifications.noNotifications}</Menu.Item>
        )}
      </Menu.ItemGroup>
    </Menu>
  );
}

export default NotificationHeaderMenu;
