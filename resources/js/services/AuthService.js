export default {
    login(email, password) {
        return new Promise((resolve, reject) => {
            http.post('/auth/login', {
                email,
                password
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject([]);
            });
        });
    },

    register(firstName, lastName, email, password, passworConfirmation) {
        return new Promise((resolve, reject) => {
            http.post('/auth/register', {
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                password_confirmation: passworConfirmation
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject([]);
            });
        });
    },

    forgottenPassword(email) {
        return new Promise((resolve, reject) => {
            http.post('/auth/forgotten-password', {
                email
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject([]);
            });
        });
    },

    resetPassword(resetToken, password, passwordConfirmation) {
        return new Promise((resolve, reject) => {
            http.post('/auth/password-reset', {
                reset_token: resetToken,
                password,
                password_confirmation: passwordConfirmation
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject([]);
            });
        });
    }
}