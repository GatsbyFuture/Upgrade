const userModel = require('../models/user.model');
const UserDto = require('../dtos/user.dto');
const tokenService = require('./token.service');
const mailSerivce = require('./mail.service');
const bcrypt = require('bcrypt');

class AuthService {
    async register(email, password) {
        const existUser = await userModel.findOne({email: email});

        if (existUser) {
            throw new Error(`User with existing email ${email} already registered`);
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({email, password: hashPassword});
        const userDto = new UserDto(user);

        await mailSerivce.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`);

        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {user: userDto, ...tokens};
    }

    async activation(userId) {
        const user = await userModel.findById(userId);
        if (!user) {
            throw new Error('User is not found');
        }
        user.isActivated = true;
        await user.save();
    }
}

module.exports = new AuthService();