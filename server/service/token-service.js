const Users = require('../models/User');
const Token = require('../models/Token');
const jwt = require('jsonwebtoken');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {expiresIn: '15d'});
        return {accessToken, refreshToken};
    }

    async saveToken(user_id, refreshToken) {
        try {
            const user = await Users.findById(user_id);
            if(!user) {
                return 'No such user';
            }
            const tokenData = await Token.findOne({user_id});
            if(tokenData) {
                tokenData.refreshToken = refreshToken;
                await tokenData.save();
            } else  {
                await Token.create({ refreshToken, user_id });
            }
            return 'success';
        } catch(err) {
            console.log(err);
        }
    }

    async removeToken(refreshToken) {
        try {
            await Token.findOneAndRemove({refreshToken});
            return 'Success';
        } catch (err) {
            console.log(err);
        }
    }

    verifyAccessToken(accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            return decoded;
        } catch (err) {
            console.log(err);
            throw new Error('Invalid token');
        }
    }

    async verifyRefreshToken(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);
            const tokenFromDb = await Token.findOne({refreshToken}).populate('user_id');
            if(!decoded || !tokenFromDb) {
                throw new Error('Invalid token');
            }
            const tokens = this.generateTokens({username: tokenFromDb.user_id.username, id: tokenFromDb.user_id._id});
            await this.saveToken(decoded.id, tokens.refreshToken);
            return tokens;
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    }
    // async getUserByToken(refreshToken) {
    //     try {
    //         return await Token.findOne({refreshToken}).populate('userId');
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
}

module.exports = new TokenService();