const crypto = require("crypto")
const jsonwebtoken = require("jsonwebtoken")
const fs = require("fs")
const path = require("path")

const pathTokey = path.join(__dirname,"..","/utils/id_rsa_priv.pem")
const PRIV_KEY = fs.readFileSync(pathTokey,"utf8")

function genPassword(password){
    const salt = crypto.randomBytes(32).toString("hex")
    const hash = crypto.pbkdf2Sync(password,salt,10000,64,"sha512").toString("hex")
    return {salt,hash}
}

function validPassword(password,hash,salt){
    const hashVerify = crypto.pbkdf2Sync(password,salt,10000,64,"sha512").toString("hex")
    return hash === hashVerify

}
function issueJWT(user){
    const id = user.id
    const expiresIn ="1d"
    const payload = {
        sub: id,
        iat:Date.now()
    }
    const signedToken = jsonwebtoken.sign(payload,PRIV_KEY,{expiresIn, algorithm:"RS256"})

    return {
        token: "Bearer " + signedToken,
        expiresIn
    }
}


module.exports.validPassword = validPassword
module.exports.genPassword = genPassword
module.exports.issueJWT = issueJWT