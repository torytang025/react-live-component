import { CountDown } from './components';

function App() {
  return (
    <div className="bg-transparent relative h-[1080px] w-[1920px]">
      <CountDown className="absolute left-[40px] top-1/2 -translate-y-1/2 " />
    </div>
  );
}

export default App;
