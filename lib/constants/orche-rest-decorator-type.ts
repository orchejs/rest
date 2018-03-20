/**
 * Decorator types of Orche REST.
 */
enum OrcheRestDecoratorType {
  /**
   * The HTTP methods used by the endpoints.
   */
  Http,
  /**
   * Decorators to identify the endpoint parameters, such as requestParam,
   * responseParam, queryParam, etc.
   */
  Parameter,
  /**
   * Decorator to identify a file that contains endpoints to
   * be searched for.
   */
  Route,
  /**
   * Identifies the middlewares that the orchejs should look and load
   * at the application startup.
   */
  Middleware,
  /**
   * Decorators for application security as AuthenticationProvider, AllowedRoles
   */
  Security,
  /**
   * Decorators that plug functionalities to monitor the endpoints and application
   * behaviour.
   */
  Monitoring
}

export { OrcheRestDecoratorType };
