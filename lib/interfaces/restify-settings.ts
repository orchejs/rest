/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/orchejs/rest/LICENSE
 */
export interface RestifySettings {
  /**
   *  If you want to create an HTTPS server, pass in a PEM-encoded certificate and key.
   */
  certificate: any;
  /**
   *  If you want to create an HTTPS server, pass in a PEM-encoded certificate and key.
   */
  key: any;
  /**
   *  Custom response formatters for res.send().
   */
  formatters: any;
  /**
   * 	When true (default is false) restify will use a domain to catch and respond to any uncaught
   *  exceptions that occur in it’s handler stack.
   */
  handleUncaughtExceptions: boolean;
  /**
   * 	By default, this will be set in the Server response header, default is restify. Pass empty
   *  string to unset the header.
   */
  name: string;
  /**
   * 	Any options accepted by node-spdy.
   */
  spdy: any;
  /**
   * 	Default version(s) to set for all routes.
   */
  version: any;
  /**
   * 	Hook the upgrade event from the node HTTP server, pushing Connection: Upgrade requests through
   *  the regular request handling chain; defaults to false.
   */
  handleUpgrades: boolean;
  /**
   * 	Any options accepted by node-https Server. If provided the following restify server options
   *  will be ignored: spdy, ca, certificate, key, passphrase, rejectUnauthorized, requestCert and
   * iphers; however these can all be specified on httpsServerOptions.
   */
  httpsServerOptions: any;
  /**
   * 	(Default=false). If set, Restify will treat “/foo” and “/foo/” as different paths.
   */
  strictRouting: boolean;
}
