import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import { PiPaperPlaneFill } from "react-icons/pi";
import { GiPlainSquare } from "react-icons/gi";
import backendAPI from '../backend-API/api';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState('Chat with Eliza...');
  const setIntro = useStoreActions(actions => actions.setIntro)
  const onSendMessage = useStoreActions(actions => actions.onSendMessage)

  const handleSendMessage = async () => {
    if (!message == '' && message.trim()) {
      onSendMessage({
        user: 'user',
        message: message
      });
      setLoading(true);
      setMessage('');
      
      if (loading) {
        setPlaceholder('Loading...');
      } else {
        setPlaceholder('Chat with Eliza...');
      }


      try {
        const res = await fetch(backendAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: message
          }),
        });
      
        const data = await res.json();

        onSendMessage({
          user: 'bot',
          message: data.response
        });
      } catch (error) {
        console.error('Error:', error);
        onSendMessage({
          user: 'bot',
          message: "Sorry, something went wrong."
        });
      }
      finally {
        setLoading(false);
        setIntro(false);
      }

      setIntro(false)
    }
  };

  return (
    <div className="fixed bottom-8 left-[50%] -translate-x-[50%] bg-gray-600 h-14 w-[90%] md:w-[60%] rounded-3xl flex items-center px-4 py-7 m-auto">
      <textarea
        type="text"
        className="flex-1 resize-none w-[50%] h-12 bg-gray-600 px-2 py-3 border border-none rounded-3xl outline-none"
        placeholder={placeholder}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter'&& !loading) {
            handleSendMessage();
          }
        }}
        disabled={loading}
      ></textarea>
      <button
        className="mx-2 px-4 py-3 bg-gray-500 hover:bg-white rounded-3xl focus:outline-none"
        onClick={() => {
          if (!loading) handleSendMessage()
        }}
        disabled={loading}
      >
        {
          loading ? 
          <GiPlainSquare className='text-black'/>
          : <PiPaperPlaneFill className='text-black'/>
        }
      </button>
    </div>
  );
};

export default ChatInput;
