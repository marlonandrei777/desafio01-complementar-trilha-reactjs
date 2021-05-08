import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { MoviesContextProvider } from './contexts/MovieContext';

import './styles/global.scss';

export function App() {
  return (
    <MoviesContextProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </MoviesContextProvider>
  )
}