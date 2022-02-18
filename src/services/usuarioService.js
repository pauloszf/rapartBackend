import { deleta, getAll, newUser, userExists, atualiza, requestLogin } from "../models/usuarioModel"

const todos = async () => {
    const users = await getAll();
    return users;
}

const criar = async ({email, senha}) => {
    const usuario = await userExists({ email });

    if (usuario) return usuario;

    const user = await newUser({email, senha});
    return user; 
}

const deletar = async ({id}) => {
    const usuario = await userExists({ id });

    if(!usuario) return {message: 'User not found'};

    const user = await deleta({ id });

    return user;
}

const atualizar = async ({ id, email, senha }) => {
    const usuario = await userExists({ id });

    if(!usuario) return {message: 'User not found'};

    const user = await atualiza({ id, email, senha });
    return user;
}

const loginService = async ({email, senha}) => {
    const usuario = await userExists({ email });

    if (!usuario) return {message: 'User not found'};

    const user = await requestLogin({email, senha});
    return(user);
};

export { todos, loginService, criar, deletar, atualizar };