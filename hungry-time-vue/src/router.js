import Vue from 'vue'
import router from 'vue-router'


Vue.use(router);

const Router = new router ({
    routes: [
        // pagine pubbliche
        {
            path: '/',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/home")
            },
            children: [
                {
                    path: '',
                    name: 'homePubblica',
                    components: {
                        loginButton: () => import("./components/login-button"),
                        userMinimal:  () => import("./components/registration-button"),
                        presentazioneHome: () => import("./components/presentazione-home")
                    }
                },
                {
                    path: 'login',
                    name: 'login',
                    components: {
                        loginButton: () => import("./components/registration-button"),
                        loginForm: () => import("./components/login-form")
                    }
                },
                {
                    path: 'signup',
                    name: 'registrazione',
                    components: {
                        loginButton: () => import("./components/login-button"),
                        loginForm: () => import("./components/registration-form"),
                    }
                }
            ]
        },
        {
            path: '/paginaUtente',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/pagina-utente")
            },
            children: [
                {
                    path: ':idUtente',
                    name: 'paginaUtente',
                    components: {
                        userMinimal: () => import("./components/user-minimal")
                    }
                }
            ]
        },
        // pagine utente
        {
            path: '/',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/home"),
                vetrina: () => import("./views/vetrina-ristoranti")
            },
            children: [
                {
                    path: 'home',
                    name: 'userHome',
                    components: {
                        cercaRistorantiHome: () => import("./components/cerca-ristorante-home"),
                        userMinimal: () => import("./components/user-minimal"),
                    }
                }
            ]
        },
        // pagina risultati ricerca
        {
            path: '/',
            components: {
                header: () => import("./views/header"),
                vetrina: () => import("./views/vetrina-ristoranti")
            },
            children: [
                {
                    path: 'cerca',
                    name: 'cercaRistoranti',
                    components: {
                        cercaHeader: () => import("./components/cerca-ristorante"),
                        userMinimal: () => import("./components/user-minimal"),
                    }
                }
            ]
        },
        // pagina ristorante
        {
            path: '/ristorante',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/pagina-ristorante"),
                vetrina: () => import("./views/vetrina-ristoranti")
            },
            children: [
                // selezione numero persone + visualizzazione menu senza scelta
                {
                    path:':IDristorante',
                    name: 'paginaristorante-n-persone',
                    components: {
                        cercaHeader: () => import("./components/cerca-ristorante"),
                        userMinimal: () => import("./components/user-minimal"),
                        nPersone: () => import("./components/numero-persone"),
                        menu: () => import("./components/menu-senza-scelta")
                    }
                },
                // visualizzazione slot disponibili per numero persone inserito
                {
                    path:':IDristorante/:nPersone/slots',
                    name: 'paginaristorante-slots',
                    components: {
                        cercaHeader: () => import("./components/cerca-ristorante"),
                        userMinimal: () => import("./components/user-minimal"),
                        menu: () => import("./components/slots")
                    }
                },
                // scelta piatti prenotazione
                {
                    path:':IDristorante/:nPersone/slots/:idPrenotazioneTavolo',
                    name: 'seleziona-menu',
                    components: {
                        cercaHeader: () => import("./components/cerca-ristorante"),
                        userMinimal: () => import("./components/user-minimal"),
                        menu: () => import("./components/selezione-menu-ristorante")
                    }
                }
            ]
        },
        // pagina prenotazione completata
        {
            path: '/prenotazioneCompletata',
            components: {
                header: () => import("./views/header"),
                home: () => import("./components/prenotazione-completata")
            },
            children: [
                    {
                        path: '',
                        components: {
                            userMinimal: () => import ("./components/user-minimal")
                        }
                    }
            ]
        },
        // pagine ristoratore, GESTIONE RISTORANTE
        {
            path: '/ristoratore',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/gestione-ristorante")
            },
            children: [
                {
                    path:':IDristorante/gestione',
                    name: 'gestione-ristorante',
                    components: {
                        userMinimal: () => import("./components/user-minimal")
                    }
                }
            ]
        },
        //  pagina modifica orari ristorante
        {
            path: '/ristoratore/:IDristorante',
            components: {
                header: () => import("./views/header"),
                home: () => import("./components/orari-ristorante")
            },
            children: [
                {
                    path: 'orari',
                    name: 'modifica-orari',
                    components: {
                        userMinimal: () => import("./components/user-minimal")
                    }
                }
            ]
        },
        // pagine ristoratore, MODIFICA INFORMAZIONE + MODIFICA MENÙ
        {
            path: '/ristoratore',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/pagina-ristoratore")
            },
            children: [
                {
                    path:':IDristorante/modifica',
                    name: 'paginaRistoratore',
                    components: {
                        userMinimal: () => import("./components/user-minimal")
                    }
                }
            ]
        },
        // pagine ristoratore, ANTEPRIMA
        {
            path: '/ristoratore',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/pagina-ristorante")
            },
            children: [
                {
                    path:':IDristorante/anteprima',
                    name: 'anteprima-ristoratore',
                    components: {
                        userMinimal: () => import("./components/user-minimal"),
                        menu: () => import("./components/menu-senza-scelta")
                    }
                }
            ]
        },

        // PAGINE MODERATORE
        {
            path: '/',
            components: {
                header: () => import("./views/header"),
                home: () => import("./views/home-moderatore")
            },
            children: [
                {
                    path: ':idModeratore',
                    name: 'home-moderatore',
                    components: {
                        userMinimal: () => import("./components/user-minimal")
                    }
                }
            ]
        }
    ],
    mode: 'history',
});


Router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/signup', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

Router.afterEach((to) => {
    if (to.name !== 'paginaristorante-slots') {
        window.scrollTo(0, 0);
    }
});

export default Router;