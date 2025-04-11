// --- frontend/src/ChatWindow.jsx ---
import { useState } from 'react';

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });

    const data = await response.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="bg-gray-800 p-4 rounded-md h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-blue-300' : 'text-green-300'}`}>
            <strong>{msg.role === 'user' ? 'You' : 'Socrates'}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="text-yellow-300">Socrates is thinking...</div>}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-l-md bg-gray-700 text-white"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 py-2 rounded-r-md">Send</button>
      </div>
    </div>
  );
}
