const authService = require('../service/auth.service');

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await authService.register(email, password);
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            return res.redirect('https://sammi.ac');
        } catch (e) {
            console.log(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await authService.login(email, password);
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json({token});
        } catch (e) {
            console.log(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const data = await authService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000});
            res.status(200).json({message: 'The Refresh was successfully updated!', data});
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController();