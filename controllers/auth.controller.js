const authService = require('../service/auth.service');

class AuthController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await authService.register(email, password);
            return res.json(data);
        } catch (e) {
            console.log(e);
        }
    }

    async activation(req, res, next) {
        try {
            const userId = req.params.id;
            await authService.activation(userId);
            return res.json({message: 'User activated'})
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new AuthController();