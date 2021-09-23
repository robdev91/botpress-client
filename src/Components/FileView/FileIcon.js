import React from 'react';
import './FileIcon.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FileIcon = ({ icon }) => {

  return (
    <div className='file-icon'>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

FileIcon.propTypes = {
};

FileIcon.defaultProps = {
};
