import http from '../http-common'

class PiattiDataService {

    getByRistorante (id) {
        return http.get(`/ristorante/${id}/piatti`);
    }

    deleteById (id) {
        return http.delete(`/piatto/${id}`);
    }

    creaPiatto (datiPiatto) {
        return http.post(`/ristoratore/aggiungiPiatto`, datiPiatto)
    }

    updatebyRistorante(id, piattiAggiornati) {
        return http.put(`ristoratore/${id}/piatti`, piattiAggiornati);
    }

}

export default new PiattiDataService();