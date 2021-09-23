import React from 'react';
import './FileItem.css';

import { FileIcon } from './FileIcon'

import { faFolder, faFolderOpen, faChevronRight, faChevronDown, faFile, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const FileItem = ({ name, path, isDirectory, isExpanded, parent, children, depth, onToggle, isReady }) => {

  const handleClick = () => {
    onToggle(path, isExpanded, isDirectory)
  }

  const iconLabel = () => {
    return (
      <div className='icon-label' style={{ paddingLeft: `${depth * 8}px` }} onClick={handleClick}>
        {isDirectory
          ?
          isExpanded
            ? <FileIcon icon={faChevronDown} />
            : <FileIcon icon={faChevronRight} />
          : <div className='icon-spacing'></div>
        }
        <div className='spacing'></div>
        {(!isReady && isExpanded)
          ? <FileIcon icon={faSpinner} />
          : isDirectory
            ?
            isExpanded
              ? <FileIcon icon={faFolderOpen} />
              : <FileIcon icon={faFolder} />
            : <FileIcon icon={faFile} />}
        <div className='spacing'></div>
        <div>{name}</div>
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
};

FileItem.defaultProps = {
};
