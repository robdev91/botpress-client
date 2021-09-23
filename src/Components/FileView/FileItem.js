import React from 'react';
import PropTypes from 'prop-types';
import './FileItem.css';

import { FileIcon } from './FileIcon'

import { faFolder, faFolderOpen, faChevronRight, faChevronDown, faFile, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const FileItem = ({ name, path, isDirectory, isExpanded, children, depth, onToggle, isReady }) => {

  const handleClick = () => {
    onToggle(path, isExpanded, isDirectory)
  }

  const iconLabel = () => {
    return (
      <div className='icon-label' style={{ paddingLeft: `${depth * 8}px` }} onClick={handleClick}>
        {isDirectory
          ?
          isExpanded
            ? <FileIcon icon={faChevronDown} testid='faChevronDown' />
            : <FileIcon icon={faChevronRight} testid='faChevronRight' />
          : <div className='icon-spacing' data-testid='icon-spacing'></div>
        }
        <div className='spacing'></div>
        {(!isReady && isExpanded)
          ? <FileIcon icon={faSpinner} testid='faSpinner' />
          : isDirectory
            ?
            isExpanded
              ? <FileIcon icon={faFolderOpen} testid='faFolderOpen' />
              : <FileIcon icon={faFolder} testid='faFolder' />
            : <FileIcon icon={faFile} testid='faGeneral' />}
        <div className='spacing'></div>
        <div testid='icon-name'>{name}</div>
      </div>
    )
  }

  return (
    <div
      key={`${path}`}
    >
      {iconLabel()}
      {isReady && isExpanded && children.map(child => {
        return (
          <FileItem
            key={child.path}
            name={child.name}
            path={child.path}
            isDirectory={child.isDirectory}
            isExpanded={child.isExpanded}
            isReady={child.isReady}
            children={child.children}
            depth={depth + 1}
            parent={this}
            onToggle={onToggle}
          />
        )
      })}
    </div>
  );
};

FileItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.array.isRequired,
  depth: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  isReady: PropTypes.bool.isRequired,
};

FileItem.defaultProps = {
  name: 'services',
  path: 'services',
  isDirectory: true,
  isExpanded: false,
  children: [],
  depth: 0,
  onToggle: () => { },
  isReady: true,
};
