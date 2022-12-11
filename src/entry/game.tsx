import Game from '@/view/game';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <Game />
  </RecoilRoot>,
);
