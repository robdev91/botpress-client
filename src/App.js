import { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard';

import io from 'socket.io-client';

function App() {

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className='App' data-testid='App'>
      {socket ? (
        <Dashboard socket={socket} />
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;
