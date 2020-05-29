/**
 * Testing the NotFoundPage
 */

import React from 'react';
import { render } from 'react-testing-library';

import NotFound from '../index';
import messages from '../messages';

describe('<NotFound />', () => {
  it('should render the Page Not Found text', () => {
    const { queryByText } = render(<NotFound />);
    expect(queryByText(messages.header.defaultMessage)).not.toBeNull();
  });
});
