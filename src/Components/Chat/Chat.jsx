import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SendIcon from '@mui/icons-material/Send';

export default function ChatInput() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* Message list */}
      <div style={{
        marginBottom: '50px', width: '70%', maxHeight: '80vh', overflowY: 'auto',
        backgroundColor: '#f0f0f0', padding: '10px', boxSizing: 'border-box'
      }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            maxWidth: '60%', minHeight: '50px', padding: '10px', margin: '5px 0',
            backgroundColor: '#ffffff', borderRadius: '10px', wordWrap: 'break-word',
            textAlign: 'left', alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end'
          }}>
            {msg}
          </div>
        ))}
      </div>
      {/* Input form */}
      <FormControl sx={{ position: 'fixed', bottom: 0, width: '70%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
  <OutlinedInput
    value={message}
    onChange={handleChange}
    placeholder="Type your message..."
    endAdornment={
      <InputAdornment position="end">
        <div
          style={{
            backgroundColor: '#800080',  // Purple background
            color: 'white',
            padding: '10px 10px',  // Adjusted padding for a more rectangular shape
            borderRadius: '5px',  // Less rounded corners, more rectangular
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

    </div>
  );
}
