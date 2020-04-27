import http from '../http-common'

class TavoliDataService {

    getByIdRistorante(id) {
        return http.get(`/tavoli/${id}`);
    }

    getAccettateByIdRistorante(id) {
        return http.get(`/tavoli/${id}/accettate`);
    }

    getPendingByIdRistorante(id) {
        return http.get(`tavoli/${id}/pending`);
    }

    prenotaTavolo(datiPrenotazione) {
        return http.post('/tavolo/prenota', datiPrenotazione);
    }

    updatePrenotazione(id, dati) {
        return http.put(`/tavolo/${id}/aggiorna`, dati);
    }

}

export default new TavoliDataService();