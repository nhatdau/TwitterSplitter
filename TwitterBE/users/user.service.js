// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: '123456', firstName: 'Test', lastName: 'User' },
                { id: 2, username: 'test2', password: '123456', firstName: 'Test2', lastName: 'User' }];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
