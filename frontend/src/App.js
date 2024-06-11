import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatRoom from './Pages/ChatRoom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={HomePage} exact/>
        <Route path='/chatRoom' Component={ChatRoom}/>
      </Routes>
    </div>
  );
}
export default App;
