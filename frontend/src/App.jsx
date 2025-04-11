import { useState } from 'react';
import ChatWindow from './ChatWindow';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Socrates 2.0</h1>
      <ChatWindow />
    </div>
  );
}
