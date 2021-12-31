import { listaVideos, novoVideo, videoExiste, deletaVideo, atualizaVideo } from "../models/videoModel";

const todosVideos = async () => {
    const videos = await listaVideos();
    return videos;
}

const criarVideo = async ({nomeVideo, linkVideo, thumbVideo}) => {
    const video = await videoExiste({ nomeVideo });

    if (video) return video;

    const prod = await novoVideo({nomeVideo, linkVideo, thumbVideo});
    return prod; 
}

const deletarVideo = async ({id}) => {
    const video = await videoExiste({ id });

    if(!video) return {message: 'Video não encontrado!'};

    const ytVideo = await deletaVideo({ id });

    return ytVideo;
}

const atualizarVideo = async ({ id, nomeVideo, linkVideo, thumbVideo }) => {
    const video = await videoExiste({ id });

    if(!video) return {message: 'Video não encontrado!'};

    const ytVideo = await atualizaProduto({ id, nomeVideo, linkVideo, thumbVideo });
    return ytVideo;
}

export { todosVideos, criarVideo, deletarVideo, atualizarVideo };