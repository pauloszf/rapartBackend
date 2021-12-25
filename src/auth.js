let crypto = require("crypto");

function criarSenha (senha, salt) {
    return crypto.pbkdf2Sync(senha, salt, 1000, 64, "sha512").toString("hex");
}

function salt () {
    return crypto.randomBytes(16).toString("hex");
}

export {criarSenha, salt};