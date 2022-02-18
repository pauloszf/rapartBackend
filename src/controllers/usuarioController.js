import { todos, criar, deletar, atualizar, loginService } from "../services/usuarioService"

const getAll = async (req, res) => {
    const users = await todos();

    const newList = users.map((user) => (
        {
            email: user.email,
            saltSenha: user.saltsenha,
            _id: user._id
        }
    ));

    return res.status(200).json(newList);
}

const createUser = async (req, res) => {
    const { email, senha } = req.body;

    const {email: mail, _id} = await criar({ email, senha });
    return res.status(200).json({mail, _id});
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await deletar({ id });

    return res.status(200).json(user);
}

const updateUser = async (req, res) => {
    const { email, senha } = req.body;
    const { id } = req.params;

    const user = await atualizar({ id, email, senha})

    res.status(200).json(user);
}

const loginController = async (req, res) => {
    const {email, senha } = req.body;

    const userLogin = await loginService({email, senha});

    res.status(200).json(userLogin);
};

export { getAll, loginController, createUser, deleteUser, updateUser };