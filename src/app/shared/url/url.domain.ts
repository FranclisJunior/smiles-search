'use strict';

export const API_VERSION = 'v1';

/**
 * Default URL of the back-end server.
 *
 * @type {string}
 */
export const SERVER_URL = 'https://api-air-calendar-prd.smiles.com.br/v1/airlines';
// export const SERVER_URL = 'https://' + document.location.hostname + ':5001/core/' + API_VERSION + '/';

export namespace LoginURL {
  export const BASE = 'login';
  export const REFRESH_TOKEN = 'refresh';
}

export namespace UserURL {
  export const BASE = 'users';
  export const CHANGE_PASSWORD = BASE + '/current/password';
  export const CREATE_USER = BASE + '/create-user';
}

export namespace FileURL {
  export const BASE = SERVER_URL + 'files';
}
