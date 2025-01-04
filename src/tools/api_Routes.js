const user_id = JSON.parse(localStorage.getItem("user"))?.user_id
const Host = "http://127.0.0.1:8080"
export const api_Routes = {
    Auth: {
        login: `${Host}/user/login`,
        add: `${Host}/user/register`,
        verifyaccount: `${Host}/user/register/verification`,
        Resendverifyaccount: `${Host}/user/register/resendVerification`,
        SendEmailForForgetPassword: `${Host}/user/forgetPassword/step1`,
        VerficationPasswordByEmail: `${Host}/user/forgetPassword/step2`,
        ResetPassword: `${Host}/user/forgetPassword/step3`,
        ForgetPasswordResend: `${Host}/user/forgetPassword/resendVerification`,
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
