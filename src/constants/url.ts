import config from '../../config';

export const BASE_URL = config.BASE_URL;

const combine = (...params: string[]) => `${BASE_URL}/api/${params.join('/')}`;
// Product
export const PRODUCT_URL = combine('product');
export const PRODUCT_SEARCH_URL = combine('product/search');

// Home Config
export const HOME_CONFIG_URL = combine('zapp/home-configs/s');

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
export const PRODUCT = '/product';
export const SEARCH = '/s';
export const CATEGORIES = '/categories';
export const CATEGORIES_QUERY = '/categories?categoryId=';

// zapp config
export const ZAPP_URL = combine('zapp');
export const CHECK_APP = '/check/app';
