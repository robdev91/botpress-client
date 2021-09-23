import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './FileView.css';

import { FileItem } from './FileItem'

export const FileView = ({ socket, watcher }) => {

  const { id, basename, isDirectory } = watcher;
  const [rootNode, setRootNode] = useState({
    name: basename,
    path: '.',
    isDirectory: isDirectory,
    isExpanded: false,
    isReady: false,
    children: [],
  });

  const searchParentElement = useCallback((node, path) => {
    const parts = path.split('/')
    if (parts.length === 1) {
      return node
    } else {
      const name = parts[0]
      const cfolder = node.children.filter(c => {
        const cparts = c.path.split('/')
        const cname = cparts[cparts.length - 1]
        return cname === name
      })
      if (cfolder.length === 0) {
        return null
      }
      parts.shift()
      return searchParentElement(cfolder[0], parts.join('/'))
    }
  }, []);

  const searchElement = useCallback((node, path) => {
    if (path === '.') return node
    const parts = path.split('/')
    if (parts.length === 1) {
      const name = parts[0]
      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].name === name) return node.children[i]
      }
    } else {
      const name = parts[0]
      const cfolder = node.children.filter(c => c.path === name)
      if (cfolder.length === 0) return null
      parts.shift()
      return searchElement(cfolder[0], parts.join('/'))
    }
    return null
  }, []);

  const eventListener = useCallback((item) => {
    const { type, path, name, isDirectory } = item
    switch (type) {
      case 'expand':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const element = searchElement(newRoot, path)
          if (!!element) {
            element.isExpanded = true
            element.isReady = false
          }
          return newRoot
        })
        break;
      case 'collapse':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const element = searchElement(newRoot, path)
          if (!!element) {
            element.isExpanded = false
            element.isReady = false
          }
          return newRoot
        })
        break;
      case 'close':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const element = searchElement(newRoot, path)
          if (!!element) element.isReady = true
          return newRoot
        })
        break;
      case 'ready':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const element = searchElement(newRoot, path)
          if (!!element) element.isReady = true
          return newRoot
        })
        break;
      case 'add':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const parentElement = searchParentElement(newRoot, path)
          const newElement = {
            name: name,
            path: path,
            isDirectory: !!isDirectory,
            isExpanded: false,
            children: [],
          }
          if (!parentElement) return newRoot
          const newChildren = [...parentElement.children]
          if (newChildren.filter(c => c.path === path).length === 0) newChildren.push(newElement)
          newChildren.sort((a, b) => {
            if (a.isDirectory && !b.isDirectory) return -1
            else if (!a.isDirectory && b.isDirectory) return 1
            else if (a.name < b.name) return -1
            else if (a.name > b.name) return 1
            return 0
          })
          parentElement.children = newChildren
          return newRoot
        })
        break;
      case 'remove':
        setRootNode(rootNode => {
          const newRoot = {...rootNode}
          const parentElement = searchParentElement(newRoot, path)
          if (!!parentElement) parentElement.children = [...parentElement.children].filter(node => node.path !== path)
          return newRoot
        })
        break;
      default:
        console.log('not supported yet', item);
    }
  }, [searchParentElement, searchElement]);

  useEffect(() => {
    socket.on(`event-${id}`, eventListener);
    return () => socket.off(`event-${id}`, eventListener);
  }, [socket, id, eventListener]);

  const handleToggle = useCallback((path, isExpanded, isDirectory) => {
    if (isExpanded) {
      setRootNode(rootNode => {
        const newRoot = {...rootNode}
        const element = searchElement(newRoot, path)
        element.isExpanded = false
        element.children = []
        return newRoot
      })
    }
    if (isDirectory) {
      socket.emit(isExpanded ? 'collapse' : 'expand', {
        id,
        path,
      })
    }
  }, [socket, id, searchElement])

  return (
    <div className='file-view'>
      <FileItem
        name={rootNode.name}
        path={rootNode.path}
        isDirectory={rootNode.isDirectory}
        isExpanded={rootNode.isExpanded}
        isReady={rootNode.isReady}
        children={rootNode.children}
        depth={0}
        onToggle={handleToggle}
      />
    </div>
  );
};

FileView.propTypes = {
  socket: PropTypes.object.isRequired,
  watcher: PropTypes.object.isRequired,
};

FileView.defaultProps = {
  socket: {
    on: (event, cb) => { },
    off: (event, cb) => { },
    emit: (event, data) => { }
  },
  watcher: {
    id: 0,
    basename: 'services',
    isDirectory: true,
  },
};
