const Users = require('../models/User');
const bcrypt = require('bcrypt');
const tokenService = require('./token-service');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


class UsersService {
    async registerUser(username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 5);
            const defaultImagePath = 'default-user-image/default_user_image.jpg';
            const newUser = new Users({username, password: hashedPassword, userImage: defaultImagePath});
            await newUser.save()
            return newUser;
        } catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    }

    async loginUser(username, password) {
        try {
            const user = await Users.findOne({ username });
            if(!user) {
                return 'No such user';
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const tokens = tokenService.generateTokens({username: user.username, id: user._id});
            await tokenService.saveToken(user._id, tokens.refreshToken);
            return tokens;
        }catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }

    async updateUserInfo(userId, userImage) {
        try {
            const user = await Users.findById(userId);
            const pathForClient = `${uuidv4()}.jpg`;
            const imagePath = path.join(__dirname, '/..', '/media', '/user-images', pathForClient);
            await userImage.mv(imagePath, ()=> console.log('moved successfully'));
            user.userImage = pathForClient;
            await user.save();
            return 'success';
        } catch (err) {
            console.log(err);
        }
    }
    async logoutUser(user_id) {
        try {
            return await tokenService.removeToken(user_id);
        } catch (err) {
            console.log(err);
        }
    }
    async getUser(userId) {
        try {
            return await Users.findById(userId);
        } catch (err) {
            console.log(err);
        }
    }

    async changePassword(userId, currentPassword, newPassword) {
        try {
            const user = await Users.findById(userId);
            if(!user) {
                throw new Error('No such user');
            }
            const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
            if(!isPasswordValid) {
                throw new Error('Invalid password');
            }
            user.password = await bcrypt.hash(newPassword, 5);
            await user.save();
            return 'Password Changed successfully';
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
    async changeUserName(userId, newUserName) {
        try {
            const user = await Users.findById(userId);
            if(!user) {
                throw new Error('No such user');
            }
            user.username = newUserName;
            await user.save();
            return 'Successfully changed username';
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
}

module.exports = new UsersService();