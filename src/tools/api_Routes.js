const user_id = JSON.parse(localStorage.getItem("user"))?.user_id
const Host = "http://localhost:8080"
export const api_Routes = {
    Auth: {
        login: `${Host}/auth/login`,
        register: `${Host}/auth/signup`,
    },

    Search: {
        view: `${Host}/panels/search`,
        servers: `${Host}/services/search`,
    },
    AddPanel: {
        add: `${Host}/panel`,
    },
    HomePage: {
        view: `${Host}/homepage`,
    },
    Providers: {
        view: `${Host}/panels/search`,
        getOne: (id) => (`${Host}/panels/${id}`),
        add_rate: `${Host}/review`,
    },
    OurServices: {
        view: `${Host}/OurServices`,
        add: `${Host}/request`,
    },
    OurOffer: {
        view: `${Host}/offers`,
    },
    Groups: {
        myGroups: `${Host}/groups/myGroups`,
        add: `${Host}/offers`,
    }
}
