import { listaTodosProdutos, novoProduto, produtoExiste, deletaProduto, atualizaProduto } from "../models/produtoModel";

const todosProdutos = async () => {
    const produtos = await listaTodosProdutos();
    return produtos;
}

const criarProdutos = async ({nomeProd, descProd, precoProd, qtdProd}) => {
    const produto = await produtoExiste({ nomeProd });

    if (produto) return produto;

    const prod = await novoProduto({nomeProd, descProd, precoProd, qtdProd});
    return prod; 
}

const deletarProdutos = async ({id}) => {
    const produto = await produtoExiste({ id });

    if(!produto) return {message: 'Produto não encontrado!'};

    const prod = await deletaProduto({ id });

    return prod;
}

const atualizarProdutos = async ({ id, nomeProd, descProd, precoProd, qtdProd }) => {
    const produto = await produtoExiste({ id });

    if(!produto) return {message: 'Produto não encontrado!'};

    const prod = await atualizaProduto({ id, nomeProd, descProd, precoProd, qtdProd });
    return prod;
}

export { todosProdutos, criarProdutos, deletarProdutos, atualizarProdutos };