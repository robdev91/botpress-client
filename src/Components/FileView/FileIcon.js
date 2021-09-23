import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const FileIcon = ({ icon }) => {

  return (
    <div style={{width: '16px', display: 'flex', justifyContent: 'center'}}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

FileIcon.propTypes = {
};

FileIcon.defaultProps = {
};
