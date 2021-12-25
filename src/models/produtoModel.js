import { ObjectId } from "mongodb";
import connection from "../mongoConnection";

const listaTodosProdutos = async () => {
    const db = await connection();
    return db.collection('produtos').find().toArray();
}

const novoProduto = async ({nomeProd, descProd, precoProd, qtdProd}) => {
    const db = await connection();
    const produto = await db.collection('produtos').insertOne({nomeProd, descProd, precoProd, qtdProd});
    return produto;
}

const produtoExiste = async ({nomeProd, id}) => {
    const db = await connection();
    let produto = null;
    if(id){
        produto = await db.collection('produtos').findOne({ _id: ObjectId(id) });
    } else {
        produto = await db.collection('produtos').findOne({nomeProd});
    }
    return produto;
};

const deletaProduto = async ({id}) => {
    const db = await connection();
    await db.collection('produtos').deleteOne({ _id: ObjectId(id) });
    return { id };
}

const atualizaProduto = async ({ id, nomeProd, descProd, precoProd, qtdProd }) => {
    const db = await connection();
    await db.collection('produtos').updateOne({ _id: ObjectId(id) }, {$set: { nomeProd, descProd, precoProd, qtdProd }});

    return { id, nomeProd, descProd, precoProd, qtdProd };
}

export { listaTodosProdutos, novoProduto, produtoExiste, deletaProduto, atualizaProduto };