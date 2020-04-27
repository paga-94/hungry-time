import http from '../http-common'

class OrariDataService {

    getByRistorante (id) {
        return http.get(`/${id}/orari`);
    }

}

export default new OrariDataService();