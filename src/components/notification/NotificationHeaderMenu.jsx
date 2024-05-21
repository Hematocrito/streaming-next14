/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import { Menu, Row, Col, Button, Avatar } from 'antd';
import Link from 'next/link';
// import './NotificationHeaderMenu.less';
import Router, { useRouter } from 'next/router';
import moment from 'moment';
import { headerContent } from '@components/common/layout/header';
function NotificationHeaderMenu(_a) {
    var notifications = _a.notifications, readAll = _a.readAll, readOne = _a.readOne;
    var _b = useRouter(), pathname = _b.pathname, locale = _b.locale;
    var h = headerContent['en-US'];
    var options;
    if (typeof (h) === 'undefined') {
        h = headerContent['en-US'];
        options = h.options;
    }
    else {
        options = h.options;
    }
    var redirect = function (notification) {
        console.log('RefUser ', notification.createdBy.username);
        switch (notification.type) {
            case 'gallery':
                return Router.push({
                    pathname: '/gallery',
                    query: {
                        id: notification.refId
                    }
                }, "/gallery/".concat(notification.refId));
            case 'feed':
                return Router.push({
                    pathname: '/post',
                    query: {
                        id: notification.refId
                    }
                }, "/post/".concat(notification.refId));
            case 'live':
                return Router.push({
                    pathname: '/stream',
                    query: {
                        username: notification.createdBy.username
                    }
                }, "/stream/".concat(notification.createdBy.username));
            case 'video':
                return Router.push({
                    pathname: '/video',
                    query: {
                        id: notification.refId
                    }
                }, "/video/".concat(notification.refId));
            default: return null;
        }
    };
    var onClickItem = function (notification) {
        readOne(notification);
        redirect(notification);
    };
    return (<Menu title={options.notifications.tooltip} className="notification-menu" style={{ width: '100%' }}>
      <Menu.ItemGroup title={(<span>
            {options.notifications.tooltip}
            <Button className="btn-dismiss-read-all" onClick={readAll}>
              {options.notifications.markAsRead}
            </Button>
            <Link legacyBehavior href={pathname === '/notification' ? '#' : '/notification'}>
              <a style={{ marginTop: '6px' }}>{options.notifications.seeAll}</a>
            </Link>
          </span>)}>
        {notifications && notifications.length > 0 ? (notifications.map(function (notification) {
            var _a, _b;
            return (<Menu.Item onClick={function () { return onClickItem(notification); }} key={notification._id} className={!notification.read ? 'notification-unread' : 'notification-read'}>
              <Row gutter={{ md: 4, lg: 4 }} className="notification-item">
                <Col md={3} lg={8}>
                  <div style={{
                    display: 'flex', flexDirection: 'row', gap: '12px'
                }}>
                    <Avatar src={((_a = notification === null || notification === void 0 ? void 0 : notification.createdBy) === null || _a === void 0 ? void 0 : _a.avatarPath) || '/no-image.jpg'} className="notification-avatar"/>
                    <div className="notification-line"/>
                  </div>
                </Col>
                <Col md={21} lg={16}>
                  <div className="notification-item-list">
                    <div className="message">
                      <span>
                        <span style={{ fontWeight: 'bolder' }}>{((_b = notification === null || notification === void 0 ? void 0 : notification.createdBy) === null || _b === void 0 ? void 0 : _b.name) || ''}</span>
                        &nbsp;
                        <img src="/icon-verified.png" style={{ height: 14, marginLeft: 0, marginRight: 4 }}/>
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'feed')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'create')
                    && <p style={{ display: 'inline' }}>uploaded a new post</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'feed')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'like')
                    && <p style={{ display: 'inline' }}>liked your post</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'feed')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'comment')
                    && <p style={{ display: 'inline' }}>commented your post</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'video')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'create')
                    && <p style={{ display: 'inline' }}>uploaded a new video</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'video')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'like')
                    && <p style={{ display: 'inline' }}>liked your video</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'video')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'comment')
                    && <p style={{ display: 'inline' }}>commented your video</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'gallery')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'create')
                    && <p style={{ display: 'inline' }}>uploaded a new gallery</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'gallery')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'like')
                    && <p style={{ display: 'inline' }}>liked your gallery</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'gallery')
                    && ((notification === null || notification === void 0 ? void 0 : notification.action) === 'comment')
                    && <p style={{ display: 'inline' }}>commented your gallery</p>}
                        {((notification === null || notification === void 0 ? void 0 : notification.type) === 'live')
                    && <p style={{ display: 'inline' }}>is live now</p>}
                      </span>
                    </div>
                    {((notification === null || notification === void 0 ? void 0 : notification.type) != 'live') &&
                    <p style={{ fontSize: '10px', marginBottom: '3px' }}>
                        "
                        {notification.title}
                        "
                      </p>}
                    <span className="time" style={{ fontSize: '8px' }}>{moment(notification.updatedAt).fromNow()}</span>
                  </div>
                </Col>
              </Row>
            </Menu.Item>);
        })) : (<Menu.Item key="no-notification">{options.notifications.noNotifications}</Menu.Item>)}
      </Menu.ItemGroup>
    </Menu>);
}
export default NotificationHeaderMenu;
