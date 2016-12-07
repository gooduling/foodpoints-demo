import { baseUrl } from '../config/apiConfig';
import ApiClient from './ApiClient';
import { mandatory } from '../utils/valadation.helper';

import FoodpointsAPI from './customAPI';

function apiFactory({ baseURL = mandatory('baseURL') } = {}) {
    const api = new ApiClient({ baseURL });

    return {
        foodpoints: new FoodpointsAPI({ apiClient: api }),
    };
}

export default apiFactory({ baseURL: baseUrl });
