import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';
import { BACKEND_URI } from '../../config';


export default function ChatInput() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [chatId, setChatId] = useState('');
  const apiUrl = BACKEND_URI;

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = async () => {
    if (message.trim() && chatId) {
      const chatMessage = {
        action: "send_event",
        chat_id: chatId,
        event: {
          type: "message",
          text: message,
          recipients: "all"
        }
      };

      try {
        const response = await axios.post(`${apiUrl}/call_livechat`, chatMessage, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`,
            'Content-Type': 'application/json'
          }
        });
        console.log('Message sent successfully:', response.data);

        const customerId = userMap.customer ? userMap.customer.id : 'unknown';
        setMessages((prevMessages) => [...prevMessages, { text: message, author_id: customerId }]);
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    }
  };

  const fetchChat = async (id) => {
    const chatRequest = {
      action: "get_chat",
      chat_id: id
    };

    try {
      const response = await axios.post(`${apiUrl}/call_livechat`, chatRequest, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Chat data fetched successfully:', response.data);

      const { thread: { events = [] }, users = [] } = response.data;
      const userMap = {};
      users.forEach((user) => {
        userMap[user.id] = user;
      });
      setUserMap(userMap);

      const newMessages = events.map((event) => ({
        text: event.text,
        author_id: event.author_id
      }));
      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching chat:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const fetchChatSummary = async () => {
    try {
      const response = await axios.post(`${apiUrl}/call_livechat`, {
        action: "list_chats"
      }, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 && response.data.chats_summary.length > 0) {
        const chatSummary = response.data.chats_summary[0];
        setChatId(chatSummary.id);
        console.log('Chat summary fetched successfully:', chatSummary);
        await fetchChat(chatSummary.id);
      } else {
        console.error('Failed to fetch chat summary or no chats found:', response.data);
      }
    } catch (error) {
      console.error('Error fetching chat summary:', error);
    }
  };

  const fetchToken = async () => {
    const existingToken = Cookies.get('access_token');
    if (existingToken) {
      console.log('Token already exists:', existingToken);
      if (!chatId) {
        await fetchChatSummary();
      } else {
        await fetchChat(chatId);
      }
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/get_customer_token`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { access_token } = response.data;
        Cookies.set('access_token', access_token, { expires: 0.167 });
        console.log('Token fetched and saved successfully.');
        await startNewChat(access_token);
      } else {
        console.error('Failed to fetch token:', response.data);
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  const startNewChat = async (token) => {
    try {
      const response = await axios.post(`${apiUrl}/call_livechat`, {
        action: "start_chat"
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        const { chat_id } = response.data;
        setChatId(chat_id);
        console.log('Chat ID fetched and set successfully:', chat_id);
        await fetchChat(chat_id);
      } else {
        console.error('Failed to fetch chat ID:', response.data);
      }
    } catch (error) {
      console.error('Error fetching chat ID:', error);
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      await fetchToken();
    };

    initializeChat();

    const intervalId = setInterval(() => {
      if (chatId) fetchChat(chatId);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [chatId]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: 'auto' }}>
      <div style={{
        // marginBottom: '100px',
        width: '90%',
        maxWidth: '90vw',
        maxHeight: '80vh',
        overflowY: 'auto',
        padding: '10px',
        boxSizing: 'border-box',
        scrollbarWidth: 'thin', // For Firefox
        scrollbarColor: 'rgba(0,0,0,0.5) transparent' // For Firefox
      }}>
        {messages.map((msg, index) => {
          const userType = userMap[msg.author_id]?.type;
          const isCustomer = userType === 'customer';
  
          return (
            <div key={index} style={{ alignSelf: isCustomer ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
              {isCustomer && <div style={{ color: 'black', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal', fontSize: '0.75em', marginBottom: '3px', textAlign: 'left' }}>YOU</div>}
              {!isCustomer && <div style={{ color: 'black', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal', fontSize: '0.75em', marginBottom: '3px', textAlign: 'left' }}>SOLVI</div>}
  
              <div style={{
                minHeight: '50px', 
                fontFamily: '"Poppins", sans-serif', 
                fontWeight: '300', 
                padding: '10px', 
                margin: isCustomer ? '5px 0 5px auto' : '5px auto 5px 0',
                wordWrap: 'break-word', 
                overflowWrap: 'break-word'
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>
      <FormControl sx={{ position: 'fixed', bottom: 20, width: '50%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
        <OutlinedInput
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          endAdornment={
            <InputAdornment position="end">
              <div
                style={{
                  backgroundColor: '#605DEC',
                  color: 'white',
                  padding: '10px 10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={handleSend}
              >
                <SendIcon />
              </div>
            </InputAdornment>
          }
        />
      </FormControl>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.5);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </div>
  );
  
  
  
}
