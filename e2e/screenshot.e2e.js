/* eslint no-undef: 0  */

import {takeScreenshot} from './utils';
describe('screenshot', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('should take screenshots', async () => {
    takeScreenshot('Home');
    // await expect(element(by.id('SETTINGS_BUTTON'))).toBeVisible();
    // await element(by.id('SETTINGS_BUTTON')).tap();
    takeScreenshot('Settings');
  });
});
