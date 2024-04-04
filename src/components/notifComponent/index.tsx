import HeaderIconContainer from '@components/common/layout/header-icon-container';
import NotificationHeaderMenu from '@components/notification/NotificationHeaderMenu';
import { notificationService } from '@services/notification.service';
import { userService } from '@services/user.service';
import { createClient } from '@supabase/supabase-js';
import { Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import { firebaseCloudMessaging } from '../../../utils/firebase';

function NotifComponent({ currentUser }: any) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const initialData = async () => {
    const request = await notificationService.search({
      limit: 50, sort: 'desc', sortBy: 'updatedAt'
    });
    if (request.status === 0) {
      const { data } = request;
      if (data.data.length > 0) {
        setNotifications(data.data);
        setUnreadCount(data.data.filter((notif:any) => !notif.read).length);
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

  const readOne = async (notification:any) => {
    if (!notification.read) {
      //  goi api PUT read
      await notificationService.read(notification._id);
      initialData();
    }
  };

  useEffect(() => {
    // LISTEN CHANGES FOR IN-APP NOTIF
    const client = createClient(
      'https://ukoppnzhogvmkxwmxriv.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrb3Bwbnpob2d2bWt4d214cml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI2MzI0MDQsImV4cCI6MjAwODIwODQwNH0.GKHaBWjdaWLJinim2ZEI4G131qsqqaIk1e29tuVI0iM'
    );
    const channel = client.channel('room-1');
    channel
      .on(
        'broadcast',
        { event: 'test' },
        (payload) => {
          console.log('PAYLOAD--', payload);
          initialData();
        }
      )
      .subscribe();
    // END LISTEN CHANGES FOR IN-APP NOTIF

    // LISTEN CHANGES FOR PUSH NOTIF
    // Event listener that listens for the push notification event in the background
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('event for the service worker', event);
        const { notification } = event.data.firebaseMessaging.payload;
        console.log('new push notification', notification);
      });
    }
    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        console.log('token', token);
        if (token) {
          console.log('token', token);
          const updateMeRequest = await userService.updateMe({
            ...currentUser,
            deviceToken: token
          });
          console.log('updateMeRequest', updateMeRequest);
        }
      } catch (error) {
        console.log(error);
      }
    }

    setToken();
    // END LIST CHANGES POR PUSH NOTIF
  });

  return (
    <HeaderIconContainer value={unreadCount} isDesktop>
      <Dropdown
        overlay={<NotificationHeaderMenu notifications={notifications} readAll={readAll} readOne={readOne} />}
        forceRender
        trigger={['click']}
        onOpenChange={(open:boolean) => {
          if (open) {
            setUnreadCount(0);
          }
        }}
      >
        <AiOutlineBell className="middle-icon" />
      </Dropdown>
    </HeaderIconContainer>
  );
}

export default NotifComponent;
