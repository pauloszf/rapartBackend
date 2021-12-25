import { Router } from 'express';
import VerifyToken from '../../middleware/usuarioMiddleware';
import { atualizarProduto, criarProduto, deletarProduto, listaProdutos } from '../controllers/produtoController';
import { createUser, deleteUser, getAll, updateUser } from '../controllers/usuarioController';
import { requestLogin } from '../models/usuarioModel';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'Safe' });
});

//Rotas de usuário

routes.get('/usuario', VerifyToken, getAll);

routes.get('/login', requestLogin)

routes.post('/usuario', createUser);

routes.delete('/usuario/:id', VerifyToken, deleteUser)

routes.put('/usuario/:id', VerifyToken, updateUser)

//Rotas de produtos 

routes.get('/produto',VerifyToken, listaProdutos);

routes.post('/produto',VerifyToken, criarProduto);

routes.delete('/produto/:id',VerifyToken, deletarProduto);

routes.put('/produto/:id',VerifyToken, atualizarProduto);


export default routes;