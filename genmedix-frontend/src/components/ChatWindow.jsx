import { useEffect, useRef, useState } from "react"
import UserIcon from "./userIcon"
import { useStoreActions, useStoreState } from "easy-peasy";

const ChatWindow = () => {

    const chatMessages = useStoreState(state => state.chatMessages);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
      }, [chatMessages]);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  return (
    <div className="flex flex-col my-4 h-[96%] overflow-auto">
        {
            chatMessages.map((chatMessage, id) => (
                <div key={id} className={`w-[90%] md:w-[55%] mx-auto flex my-2`}>
                    {chatMessage.user == 'user' ?
                    <div ref={messagesEndRef} className="ml-auto w-[70%] md:w-[50%] break-words text-left p-4 rounded-xl bg-gray-600">
                        {chatMessage.message}
                    </div>
                    : 
                    <div ref={messagesEndRef} className="flex break-words w-[100%] text-left p-4">
                        <div className="-ml-2 sm:-ml-4">
                            <UserIcon name='GM'/>
                        </div>
                        <p className="ml-2 break-words text-left w-[90%]">
                        {chatMessage.message}
                        </p>
                    </div>
                    }
                </div>
            ))
        }
    </div>
  )
}

export default ChatWindow