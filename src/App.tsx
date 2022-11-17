import { CountDown } from './components';
import { ChatBubble } from './components/chat-bubble';

function App() {
  return (
    <div className="relative h-[1080px] w-[1920px] bg-transparent">
      <CountDown className="absolute left-[40px] top-1/2 -translate-y-1/2 " />
      <ChatBubble
        className="absolute bottom-[36px] right-[20px]"
        name="torytang"
      />
    </div>
  );
}

export default App;
