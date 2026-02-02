import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

describe('Service Worker', () => {
  it('should have register function', () => {
    expect(serviceWorkerRegistration.register).toBeDefined();
  });

  it('should have unregister function', () => {
    expect(serviceWorkerRegistration.unregister).toBeDefined();
  });
});
