import http from '../http-common'

class PrenotazionePiattiDataService {

    creaPrenotazionePiatto (arrayPiatti) {
        return http.post('/prenotazione/piatti', arrayPiatti);
    }

    getByIdPrenotazione (id){
        return http.get(`/${id}/piattiPrenotazione`);
    }

}

export default new PrenotazionePiattiDataService();