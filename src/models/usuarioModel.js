import { ObjectId } from "mongodb";
import connection from "../mongoConnection";
import jwt from 'jsonwebtoken';
import { criarSenha, salt } from "../auth";
import e from "express";

const SECRET = 'NINGUEM_ACREDITARIA_SE_EU_DISSESSE';

const getAll = async () => {
    const db = await connection();
    return db.collection('usuarios').find().toArray();
}

const newUser = async ({email, senha}) => {
    const db = await connection();
    const saltsenha = salt();
    const hash = criarSenha(senha, saltsenha)
    try {
        const user = await db.collection('usuarios').insertOne({email, hash, saltsenha});
        const {insertdId: _id} = user;
        return { email, _id: _id };
    } catch (error) {
        console.log(error);
    }
}

const userExists = async ({email, id}) => {
    const db = await connection();
    let user = null;
    if(id){
        user = await db.collection('usuarios').findOne({ _id: ObjectId(id) });
    } else {
        user = await db.collection('usuarios').findOne({email});
    }
    return user;
};

const deleta = async ({id}) => {
    const db = await connection();
    await db.collection('usuarios').deleteOne({ _id: ObjectId(id) });
    return { id };
}

const atualiza = async ({ id, email, senha }) => {
    const db = await connection();
    await db.collection('usuarios').updateOne({ _id: ObjectId(id) }, {$set: { email, senha }});

    return { id, email };
}

const login = async ({email, senha}) => {
    const db = await connection();
    const user = await db.collection('usuarios').findOne({email});
    if(verificaSenha(senha, user.saltsenha, user.hash)){
        return user;
    }
    return null;
};

function verificaSenha(senha, saltsenha, hash) {
    return hash === criarSenha(senha, saltsenha);
}

const requestLogin = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await login({ email, senha });

    if (!usuario) return res.status(401).json({message: 'User not found'});

    const { _id } = usuario;
    const newToken = jwt.sign(
        {
            userId: _id,
            email,
        },
        SECRET,
        {
            expiresIn: 86400,
        }
    );
    return res.status(201).json({ token: newToken });
}

export { getAll, login, newUser, userExists, deleta, atualiza, requestLogin };