import { ObjectId } from "mongodb";
import connection from "../mongoConnection";

const listaVideos = async () => {
    const db = await connection();
    return db.collection('videos').find().toArray();
}

const novoVideo = async ({nomeVideo, linkVideo, thumbVideo}) => {
    const db = await connection();
    const video = await db.collection('videos').insertOne({nomeVideo, linkVideo, thumbVideo});
    return video;
}

const videoExiste = async ({nomeVideo, id}) => {
    const db = await connection();
    let video = null;
    if(id){
        video = await db.collection('videos').findOne({ _id: ObjectId(id) });
    } else {
        video = await db.collection('videos').findOne({nomeVideo});
    }
    return video;
};

const deletaVideo = async ({id}) => {
    const db = await connection();
    await db.collection('videos').deleteOne({ _id: ObjectId(id) });
    return { id };
}

const atualizaVideo = async ({ id, nomeVideo, linkVideo, thumbVideo }) => {
    const db = await connection();
    await db.collection('videos').updateOne({ _id: ObjectId(id) }, {$set: { nomeVideo, linkVideo, thumbVideo }});

    return { id, nomeVideo, linkVideo, thumbVideo };
}
 
export { listaVideos, novoVideo, videoExiste, deletaVideo, atualizaVideo };