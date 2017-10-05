import { ServerHelper } from './helpers';

/**
 * Global initializations and setups.
 */
before(async function() {
  this.timeout(0);

  // Initializes the server for all test cases
  await ServerHelper.initBasicServer();
});
