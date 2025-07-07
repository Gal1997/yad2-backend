import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

export const authService = {
    getLoginToken,
    validateToken,
    login,
    signup
}

function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token) {
    try {
        const json = cryptr.decrypt(token)
        const loggedinUser = JSON.parse(json)
        console.log(loggedinUser);

        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(email, password) {
    const user = await userService.getByEmail(email)
    if (!user) throw 'Unknown email'

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw 'Invalid password'

    // Only return minimal user info
    const miniUser = {
        email: user.email,
        _id: user._id
    }
    return miniUser
}

async function signup(credentials) {
    const { email, password } = credentials
    const saltRounds = 10

    loggerService.debug(`auth.service - signup with email: ${email}`)
    if (!email || !password) throw 'Missing required signup information'

    const userExist = await userService.getByEmail(email)
    if (userExist) throw 'אימייל זה כבר בשימוש'

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.save({ email, password: hash })
}
