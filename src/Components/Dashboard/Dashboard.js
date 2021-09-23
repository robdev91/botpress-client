import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FileView } from '../FileView/FileView';

export const Dashboard = ({ socket }) => {

  const [watchers, setWatchers] = useState([]);

  const watcherListener = (watchers) => setWatchers(watchers);
  const disconnectListener = () => setWatchers([]);

  useEffect(() => {
    socket.on('watchers', watcherListener);
    socket.on('disconnect', disconnectListener);

    return () => {
      socket.off('watchers', watcherListener);
      socket.off('disconnect', disconnectListener);
    }
  }, [socket]);

  const handleReload = useCallback(() => {
    setWatchers([]);
    socket.emit('reload');
  }, [socket]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <button onClick={() => handleReload()}>Reload all</button>
      {watchers.map(watcher => {
        return (
          <FileView
            key={watcher.id}
            watcher={watcher}
            socket={socket}
          />
        );
      })}
    </div>
  );
}

Dashboard.propTypes = {
  socket: PropTypes.object.isRequired
};

Dashboard.defaultProps = {
};
