import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import '../styles/Notification.css';

const Notification = () => {
  const { user } = useContext(UserContext);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    let ws;

    if (user) {
      ws = new WebSocket(`ws://localhost:8081?userId=${user.user_id}`);

      ws.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setNotification(data.message);

          setTimeout(() => setNotification(null), 5000);
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };



      ws.onclose = () => {
        console.log('WebSocket disconnected');
      };
    }

    return () => {
      if (ws) ws.close();
    };
  }, [user]);

  return (
    notification && (
      <div className="notification">
        <p>{notification}</p>
        
      </div>
    )
  );
};

export default Notification;
