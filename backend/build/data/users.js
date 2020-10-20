import bcrypt from 'bcryptjs';
var users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: ' John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Jane Die',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
];
export default users;
