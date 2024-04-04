import { INotification } from '@interfaces/notification';
import List, { ListProps } from 'antd/lib/list';
import { CSSProperties, useEffect, useState } from 'react';
import { Button } from 'antd';
import { notificationService } from '@services/notification.service';
import NotificationListItem from './NotificationListItem';

interface NotificationListProps extends ListProps<INotification> {
  notificationIds: string[];
  style: CSSProperties
}

function NotificationList({ style, ...props }: NotificationListProps) {
  const [notifications, setNotifications] = useState([]);
  const initialData = async () => {
    const request = await notificationService.search({
      limit: 25, sort: 'desc', sortBy: 'updatedAt'
    });
    if (request.status === 0) {
      const { data } = request;
      if (data.data.length > 0) {
        setNotifications(data.data);
      }
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  const readAll = async () => {
    await notificationService.readAll();
    initialData();
  };

  const readOne = async (notification) => {
    if (!notification.read) {
      //  goi api PUT read
      await notificationService.read(notification._id);
      initialData();
    }
  };

  return (
    <div className="notification-list-container">
      <Button onClick={readAll} className="notification-mark-button">Mark as read</Button>
      <List
        {...props}
        style={style}
        header="All Notifications"
        dataSource={notifications}
        renderItem={(notification) => (
          <NotificationListItem notification={notification} readOne={readOne} />
        )}
      />
    </div>

  );
}

export default NotificationList;
