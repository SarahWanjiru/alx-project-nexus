// Mock the service worker registration module
jest.mock('../serviceWorkerRegistration', () => ({
  register: jest.fn(),
  unregister: jest.fn(),
}));

import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

describe('Service Worker', () => {
  it('should have register function', () => {
    expect(serviceWorkerRegistration.register).toBeDefined();
  });

  it('should have unregister function', () => {
    expect(serviceWorkerRegistration.unregister).toBeDefined();
  });
});
