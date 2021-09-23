import React from 'react'
import { act, render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Dashboard } from './Dashboard'

test('load and reload', async () => {
  const promise = Promise.resolve()
  const socket = {
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
  }
  render(<Dashboard socket={socket} />)

  fireEvent.click(screen.getByTestId('reload'))

  await act(() => promise)
})
