import React from 'react';
import PropTypes from 'prop-types';
import './FileIcon.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';

export const FileIcon = ({ icon, testid }) => {

  return (
    <div className='file-icon' data-testid={testid}>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

FileIcon.propTypes = {
  icon: PropTypes.object,
  testid: PropTypes.string.isRequired,
};

FileIcon.defaultProps = {
  icon: faFile,
  testid: 'faFile'
};
