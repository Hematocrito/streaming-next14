/* eslint-disable react/function-component-definition */
import { useDispatch, useSelector } from 'react-redux';
import React, { CSSProperties, useEffect } from 'react';
import { fetchNotificaion } from '@redux/notification/actions';
import { createSelector } from 'reselect';
import NotificationList from './NotificationList';

interface NotificationProps {
  style?: CSSProperties
}

const Notification: React.FC<NotificationProps> = ({ style }) => {
  const notificationIds = useSelector(
    createSelector(
      (state: any) => state.notification.success,
      (state: any) => state.notification.error,
      (state: any) => state.notification.notificationIds,
      (success, error, data) => {
        if (success && !error) return data;
        return [];
      }
    )
  );

  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchNotificaion());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NotificationList style={style} notificationIds={notificationIds} />
  );
};

Notification.displayName = 'Notification';
Notification.defaultProps = {
  style: {}
};

export default Notification;
