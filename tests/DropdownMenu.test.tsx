import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropdownMenu from '../src/components/editor/DropdownMenu';
import '@testing-library/jest-dom';

const options = [
  { id: 'option-1', value: 'one', label: 'Option One' },
  { id: 'option-2', value: 'two', label: 'Option Two' },
  { id: 'option-3', value: 'three', label: 'Option Three' }
];

describe('DropdownMenu', () => {
  it('renders the dropdown with default text when there is no default option', () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(screen.queryByText('Option One')).not.toBeInTheDocument();
    expect(screen.queryByText('Option Two')).not.toBeInTheDocument();
    expect(screen.queryByText('Option One')).not.toBeInTheDocument();
  });

  it('renders the dropdown with default selected value', () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
        value='three'
      />
    );

    expect(screen.getByText('Option Three')).toBeInTheDocument();
    expect(screen.queryByText('Option Two')).not.toBeInTheDocument();
    expect(screen.queryByText('Option One')).not.toBeInTheDocument();
  });

  it('opens the dropdown when clicked', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    await userEvent.click(dropdownButton);

    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();
  });

  it('selects an option when clicked', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
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
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    await userEvent.click(dropdownButton);
    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();

    await userEvent.click(document.body);

    expect(
      screen.queryByTestId('test-dropdown-options')
    ).not.toBeInTheDocument();
  });

  it('focuses on the first element when there is no default value', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    await userEvent.click(dropdownButton);

    expect(screen.getByTestId('option-1')).toHaveClass('focused-option');
  });

  it('focuses on the default option when there is a default value', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
        value='two'
      />
    );
    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    await userEvent.click(dropdownButton);

    expect(screen.getByTestId('option-2')).toHaveClass('focused-option');
  });

  it('handles keyboard navigation', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={false}
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    await userEvent.click(dropdownButton);
    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();

    await userEvent.keyboard('{ArrowDown}');
    expect(screen.getByTestId('option-2')).toHaveClass('focused-option');

    await userEvent.keyboard('{ArrowUp}');
    expect(screen.getByTestId('option-1')).toHaveClass('focused-option');

    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByTestId('option-1')).toHaveClass('focused-option');

    await userEvent.keyboard('{End}');
    expect(screen.getByTestId('option-3')).toHaveClass('focused-option');

    await userEvent.keyboard('{Home}');
    expect(screen.getByTestId('option-1')).toHaveClass('focused-option');

    await userEvent.keyboard('{Tab}');
    expect(screen.getByTestId('test-dropdown-trigger')).toHaveTextContent(
      'Option One'
    );
    expect(screen.getByTestId('test-dropdown-trigger')).toHaveFocus();
    expect(
      screen.queryByTestId('test-dropdown-options')
    ).not.toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByTestId('test-dropdown-options')).toBeInTheDocument();
    expect(screen.getByTestId('option-1')).toHaveClass('focused-option');

    await userEvent.keyboard(' ');
    expect(screen.getByTestId('test-dropdown-trigger')).toHaveTextContent(
      'Option One'
    );
    expect(screen.getByTestId('test-dropdown-trigger')).toHaveFocus();
    expect(
      screen.queryByTestId('test-dropdown-options')
    ).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    render(
      <DropdownMenu
        id='test-dropdown'
        label='Test Dropdown'
        options={options}
        disabled={true}
        onChange={() => ''}
      />
    );

    const dropdownButton = screen.getByTestId('test-dropdown-trigger');
    expect(dropdownButton).toBeDisabled();
    await userEvent.click(dropdownButton);
    expect(
      screen.queryByTestId('test-dropdown-options')
    ).not.toBeInTheDocument();
  });
});
