const tokenService = require('../service/token-service');

class TokensController {
    async getNewTokens(req, res) {
        try {
            const {refreshToken}  = req.cookies;
            console.log(refreshToken);
            if(!refreshToken) {
                return res.status(400).json('No refresh token provided');
            }
            const tokens = await tokenService.verifyRefreshToken(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({accessToken: tokens.accessToken});
        } catch (err) {
            console.log(err);
            return res.status(401).json(err.message);
        }
    }
}

module.exports = new TokensController();