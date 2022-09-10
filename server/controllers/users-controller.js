const usersService = require('../service/users-service');
const tokenService = require('../service/token-service');


class UsersController {
    async register(req, res) {
        const { username, password } = req.body;
        try {
            const newUser = await usersService.registerUser(username, password);
            return res.json(newUser);
        } catch (err) {
            console.log(err, 'Error controller');
            return res.status(400).json('An errror occured during registration');
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        console.log(username, password);
        try {
             const tokens = await usersService.loginUser(username, password);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
             return res.json({ accessToken: tokens.accessToken });
        } catch (err) {
            console.log(err);
            return res.status(400).json( err.message);
        }
    }

    async logout(req, res) {
        const {refreshToken} = req.cookies;
        try {
            const logoutResult = await tokenService.removeToken(refreshToken);
            return res.json(logoutResult);
        } catch (err) {
            console.log(err);
            return res.status(400).json('Logout error occured');
        }
    }

    async setUserPhoto(req, res) {
        try {
            const {userPhoto} = req.files;
            await usersService.updateUserInfo(req.user.id, userPhoto);
            console.log(userPhoto);
            return res.json('all is ok with image');
        } catch (err) {
            console.log(err);
            return res.status(400).json('Error occured imae');
        }
    }

    async getCurrentUser(req, res) {
        try {
            const userId  = req.user.id;
            const user = await usersService.getUser(userId);
            return res.json(user);
        } catch (err) {
            console.log(err);
        }
    }
    async getUser(req, res) {
        try {
            const { userId }  = req.params;
            const user = await usersService.getUser(userId);
            return res.json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async changePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            if (! currentPassword || !newPassword) {
                return res.json('No current or new password');
            }
            return await usersService.changePassword(
                req.user.id, currentPassword, newPassword
            );
        } catch (err) {
            console.log(err);
            return res.json('Change password error occured');
        }
    }
    async changeUsername(req, res) {
        try {
            const {newUserName} = req.body;
            await usersService.changeUserName(req.user.id, newUserName);
            return res.json('Name changed successfully');
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new UsersController();