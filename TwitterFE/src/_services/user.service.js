import config from 'react-global-configuration';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    splitMessage
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.get('apiUrl')}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user) {
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function splitMessage(message) {
    var arrMessages = [];

    if (message.trim().length > 0) {
        var count = 0;
        var isEnd = false;
        while (!isEnd) {
            if (message.length > 50) {
                var index = message.lastIndexOf(' ', 50);
                arrMessages[count] = message.substring(0, index);
                if (index + 1 > message.length -1) {
                    isEnd = true;
                } else {
                    message = message.substring(index + 1);
                }
            }else {
                arrMessages[count] = message;
                isEnd = true;
            }
            count++;
        }
        if (count > 1) {
            arrMessages.forEach(function (item, index) {
                arrMessages[index] = (index + 1) + "/" + count + " " + arrMessages[index];
            });
        }
    }
    return arrMessages;
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
