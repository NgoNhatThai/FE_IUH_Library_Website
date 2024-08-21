import config from '../../config';

export const BASE_URL = config.BASE_URL;
export const HOME_CONFIG_ID = config.HOME_CONFIG_ID;

const combine = (...params: string[]) => `${BASE_URL}/${params.join('/')}`;

// Main route combine
export const ADMIN_ROUTE_URL = combine('admin');
export const USER_ROUTE_URL = combine('user');
export const AUTH_ROUTE_URL = combine('auth');
export const BOOK_ROUTE_URL = combine('book');

// Home Config
export const HOME_CONFIG_URL = `${ADMIN_ROUTE_URL}/get-config`;

// Product
export const PRODUCT_URL = combine('product');
export const PRODUCT_SEARCH_URL = combine('product/search');

// Home Config
export const CMS_CATEGORY_SLUG_URL = `${BASE_URL}/api/cms/categories/s`;

export const PRODUCT_CATEGORY_URL = combine('product/categories');

// Store config url
export const STORE_CONFIG_URL = combine('organization/options/search');

export const ALL_STORE_URL = combine('organization/get-all-store');

//System Config
export const SYSTEM_CONFIG_URL = `${BASE_URL}/api`;

// service url
export const ORDER_SERVICE_URL = combine('service');

export const HOME = '/';
export const BOOK = '/book';
export const SEARCH = '/s';
export const CATEGORIES = '/categories';
export const CATEGORIES_QUERY = '/categories?categoryId=';

// zapp config
export const ZAPP_URL = combine('zapp');
export const CHECK_APP = '/check/app';

// ------------------------------------------------------------------------------------

// Admin service
// Book service
