import React from 'react';

import { FileIcon } from './FileIcon'

import { faFolder, faFolderOpen, faChevronRight, faChevronDown, faFile, faSpinner } from '@fortawesome/free-solid-svg-icons'

export const FileItem = ({ name, path, isDirectory, isExpanded, parent, children, depth, onToggle, isReady }) => {

  const handleClick = () => {
    onToggle(path, isExpanded, isDirectory)
  }

  const iconLabel = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${depth * 8}px`, height: '24px', cursor: 'default', userSelect: 'none' }} onClick={handleClick}>
        {isDirectory
          ?
          isExpanded
            ? <FileIcon icon={faChevronDown} />
            : <FileIcon icon={faChevronRight} />
          : <div style={{ width: '16px' }}></div>
        }
        <div style={{ width: '3px' }}></div>
        {(!isReady && isExpanded)
          ? <FileIcon icon={faSpinner} />
          : isDirectory
            ?
            isExpanded
              ? <FileIcon icon={faFolderOpen} />
              : <FileIcon icon={faFolder} />
            : <FileIcon icon={faFile} />}
        <div style={{ width: '3px' }}></div>
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
