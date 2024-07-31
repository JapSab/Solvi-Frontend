import React from 'react';
import { LiveChatWidget } from '@livechat/widget-react';

function ChatWidget() {
  const handleNewEvent = (event) => {
    console.log('LiveChatWidget.onNewEvent', event);
  };

  return (
    <LiveChatWidget
      license="17853357"
      visibility="maximized"
      onNewEvent={handleNewEvent}
    />
  );
}

export default ChatWidget;
