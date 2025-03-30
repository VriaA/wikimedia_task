import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../src/components/editor/DropdownMenu';
import '@testing-library/jest-dom';

const options = [
  { id: 'option-1', value: 'one', label: 'Option One' },
  { id: 'option-2', value: 'two', label: 'Option Two' },
  { id: 'option-3', value: 'three', label: 'Option Three' }
];

describe('DropdownMenu', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders the dropdown with default text', () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
  });

  it('opens the dropdown when clicked', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-select');
    await userEvent.click(dropdownButton);

    await waitFor(() => {
      expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();
    });
  });

  it('selects an option when clicked', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-select');
    await userEvent.click(dropdownButton);

    const option = screen.getByTestId('option-2');
    await userEvent.click(option);

    expect(dropdownButton).toHaveTextContent('Option Two');
  });

  it('closes the dropdown when clicking outside', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-select');
    await userEvent.click(dropdownButton);
    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();

    await userEvent.click(document.body);
    await waitFor(() => {
      expect(
        screen.queryByTestId('test-dropdown-options')
      ).not.toBeInTheDocument();
    });
  });

  it('handles keyboard navigation', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-select');
    await userEvent.click(dropdownButton);
    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('option-2')).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByTestId('option-3')).toHaveFocus();

    await userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('option-2')).toHaveFocus();

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('option-1')).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    expect(dropdownButton).toHaveTextContent('Option One');

    await userEvent.keyboard('{Tab}');
    expect(screen.getByTestId('option-2')).toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    expect(screen.getByTestId('option-1')).toHaveFocus();
  });

  it('does not open when disabled', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={true}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-select');
    expect(dropdownButton).toBeDisabled();
    await userEvent.click(dropdownButton);
    expect(
      screen.queryByTestId('test-dropdown-options')
    ).not.toBeInTheDocument();
  });
});
