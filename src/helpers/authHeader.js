export function authHeader() {
    // return authorization header with jwt token
    let accessToken = JSON.parse(localStorage.getItem('uid'));

    if (accessToken) {
        return {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
}