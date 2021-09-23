import React from 'react'
import { act, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FileView } from './FileView'

test('load and reload', async () => {
  const promise = Promise.resolve()
  const props = {
    socket: {
      on: (event, cb) => {
        if (event === 'watchers') {
          cb([{
            id: 0,
            basename: 'services',
            isDirectory: true,
          }])
        }
      },
      off: (event, cb) => { },
      emit: (event, data) => {
        expect(event).toBe('reload')
        expect(data).toBe(undefined)
      }
    },
    watcher: {
      id: 0,
      basename: 'services',
      isDirectory: true,
    }
  }
  render(<FileView {...props} />)

  await act(() => promise)
})
