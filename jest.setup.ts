import '@testing-library/jest-dom';
HTMLCanvasElement.prototype.getContext = jest.fn();

beforeAll(() => {
  Object.defineProperty(window, 'scroll', {
    value: jest.fn(),
    writable: true
  });
});
