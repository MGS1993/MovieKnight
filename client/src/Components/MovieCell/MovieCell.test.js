/* eslint-disable no-undef */
import React from 'react';
import MovieCell from './MovieCell';
import { render } from '@testing-library/react';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};


test('renders title', () => {
  const { getByTestId } = render(<MovieCell />)
  expect(getByTestId('titleTest')).not.toBeNull()
})