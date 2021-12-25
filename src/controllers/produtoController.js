import { todosProdutos, criarProdutos, deletarProdutos, atualizarProdutos } from "../services/produtoService"

const listaProdutos = async (req, res) => {
    const prods = await todosProdutos();

    const newList = prods.map((prod) => (
        {
            nomeProd: prod.nomeProd,
            descProd: prod.descProd,
            precoProd: prod.precoProd, 
            qtdProd: prod.qtdProd,
            _id: prod._id
        }
    ));

    return res.status(200).json(newList);
}

const criarProduto = async (req, res) => {
    const { nomeProd, descProd, precoProd, qtdProd } = req.body;

    const {nomeProd: prod, _id} = await criarProdutos({ nomeProd, descProd, precoProd, qtdProd });
    return res.status(200).json({prod, _id});
}

const deletarProduto = async (req, res) => {
    const { id } = req.params;

    const prod = await deletarProdutos({ id });

    return res.status(200).json(prod);
}

const atualizarProduto = async (req, res) => {
    const { nomeProd, descProd, precoProd, qtdProd } = req.body;
    const { id } = req.params;

    const prod = await atualizarProdutos({ id, nomeProd, descProd, precoProd, qtdProd});

    res.status(200).json(prod);
}

export { listaProdutos, criarProduto, deletarProduto, atualizarProduto };