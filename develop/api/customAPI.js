import Base from './Base';
import LocalStorage from './LocalStorage';
import ep from '../constants/endPoints.constant';

class FoodpointsAPI extends Base {
    getFoodpoint({ pokemonId }) {
        const url = ep.pokeball.getPokemon(pokemonId);

        return this.apiClient.get(url);
    }

    getFoodpoints({ limit, offset, filterParams } = {}) {
        let query = {};
        if (filterParams) {
            let filters = [];
            const { dayParam, timeParam, keywordParam } = filterParams;
            if (dayParam && dayParam.length) {
                filters.push(`dayorder in(${dayParam})`);
            }
            if (keywordParam && keywordParam.length) filters.push(`optionaltext like "%${keywordParam}%"`);
            query.$where = filters.join(' AND ');
        }
        if (offset !== undefined && limit != undefined) {
            query.$offset = (offset + limit);
        }
        if (limit != undefined) {
            query.$limit = limit;
        }
        const url = ep.foodkorts.getFoodkortsList();
        return this.apiClient.get(url, {}, query);
    }

    login(params) {
      // TODO: must be replaced with server request.
      // LocalStorage is used for demo purposes only
        return new Promise((resolve, reject) => {
            let user = LocalStorage.get(params.email);
            if (user && params.password === user.password) {
                resolve(user);
            } else {
                reject(new Error('Password is wrong'));
            }
        });
    }

    selectUser(params) {
        // TODO: must be replaced with server request.
        // LocalStorage is used for demo purposes only
        return new Promise((resolve, reject) => {
            const user = LocalStorage.get(params.userId);
            resolve(user);
        });
    }

    addUser(params) {
      // TODO: must be replaced with server request.
        // LocalStorage is used for demo purposes only
        params.id = params.email;
        params.appointments = [];
        return new Promise((resolve, reject) => {
            LocalStorage.set(params.id, params);
            resolve(params);
        });
    }
    joinAppointment(params) {
        const { currentUser, meeting } = params;
        return new Promise((resolve, reject) => {
            let userToSave = LocalStorage.get(currentUser.id);
            userToSave.appointments.push(meeting);
            LocalStorage.set(currentUser.id, userToSave);
            resolve(params);
        });
    }
}

export default FoodpointsAPI;
