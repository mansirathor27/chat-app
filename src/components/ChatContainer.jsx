import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = ({selectedUser, setSelectedUser}) => {

  const scrollEnd = useRef()
  
  useEffect(()=>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({ behavior: "smooth" })
    }
  },[])

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* added headerr */}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className='w-8 rounded-full'/>
          <p className='flex-1 text-lg text-white flex items-center gap-2'>
            Mansi Rathor
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </p>
          <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" 
          className='md:hidden max-w-7'/>
          <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
      </div>

      {/* chat area */}
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {messagesDummyData.map((msg, index)=>(
          <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
            {msg.image ? (
              <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'/>
            ):(
              <p className={`p-2 max-w-[200px] md:text-sm font-light
                 rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none' : 
                  'rounded-bl-none'}`}>{msg.text}</p>
            )}
            <div className='text-center text-xs'>
              <img src={msg.senderId=== '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='
              w-7 rounded-full'/>
              <p className='text-gray-500'>
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-3">

  {/* Input Area (compact + transparent) */}
    <div className="flex items-center px-3 py-2 rounded-full bg-white/10 
                  backdrop-blur-md border border-white/20
                  w-full max-w-[350px]">


    <input
      type="text"
      placeholder="Send a message"
      className="flex-1 bg-transparent text-white placeholder-gray-400 
                 outline-none text-sm"
    />

    <input type="file" id="image" hidden />
    <label htmlFor="image" className="cursor-pointer">
      <img src={assets.gallery_icon} className="w-4 opacity-80 hover:opacity-100" />
    </label>
  </div>

  {/* Send button OUTSIDE the input */}
  <button>
    <img src={assets.send_button} className="w-7 cursor-pointer" />
  </button>

</div>


    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} alt="" className='max-w-16'/>
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer
