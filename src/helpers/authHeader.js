export function authHeader() {
    // return authorization header with jwt token
    let accessToken = localStorage.getItem('uid');

    if (accessToken) {
        return {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    } else {
        return {};
    }
}