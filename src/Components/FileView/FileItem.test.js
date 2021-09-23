import React from 'react'
import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { FileItem } from './FileItem'

test('load', async () => {
  const promise = Promise.resolve()
  const props = {
    name: 'services',
    path: 'services',
    isDirectory: true,
    isExpanded: false,
    children: [],
    depth: 0,
    onToggle: () => { },
    isReady: true,
  };
  render(<FileItem {...props} />)

  expect(screen.queryByTestId('faChevronRight')).not.toBeNull()
  expect(screen.queryByTestId('faChevronDown')).toBeNull()
  expect(screen.queryByTestId('icon-spacing')).toBeNull()
  expect(screen.queryByTestId('faSpinner')).toBeNull()
  expect(screen.queryByTestId('faChevronDown')).toBeNull()
  expect(screen.queryByTestId('faFolder')).not.toBeNull()
  expect(screen.queryByText('services')).not.toBeNull()

  await act(() => promise)
})
