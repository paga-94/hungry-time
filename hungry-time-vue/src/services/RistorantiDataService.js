import http from '../http-common'

class RistorantiDataService {
    getAll () {
        return http.get('/home');
    }

    getID (id) {
        return http.get(`/ristorante/${id}`);
    }

    getByNome (nome) {
        return http.get(`/cerca?nome=${nome}`);
    }

    aggiornaRistorante (id, datiAggiornati) {
        return http.put(`/ristoratore/${id}`, datiAggiornati);
    }

}

export default new RistorantiDataService();