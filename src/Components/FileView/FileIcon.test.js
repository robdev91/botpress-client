import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FileIcon } from './FileIcon'

test('load', async () => {
  const promise = Promise.resolve()
  
  render(<FileIcon/>)

  expect(screen.getByTestId('faFile')).toBeInTheDocument()

  await act(() => promise)
})
