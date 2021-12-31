import { todosVideos, criarVideo, deletarVideo, atualizarVideo } from "../services/videoService"

const listaYtVideos = async (req, res) => {
    const videos = await todosVideos();

    const newList = videos.map((ytVideo) => (
        {
            nomeVideo: ytVideo.nomeVideo,
            linkVideo: ytVideo.linkVideo,
            thumbVideo: ytVideo.thumbVideo, 
            _id: ytVideo._id
        }
    ));

    return res.status(200).json(newList);
}

const criarYtVideo = async (req, res) => {
    const { nomeVideo, linkVideo, thumbVideo } = req.body;

    const {nomeVideo: ytVideo, _id} = await criarVideo({ nomeVideo, linkVideo, thumbVideo });
    return res.status(200).json({ytVideo, _id});
}

const deletarYtVideo = async (req, res) => {
    const { id } = req.params;

    const ytVideo = await deletarVideo({ id });

    return res.status(200).json(ytVideo);
}

const atualizarYtVideo = async (req, res) => {
    const { nomeVideo, linkVideo, thumbVideo } = req.body;
    const { id } = req.params;

    const ytVideo = await atualizarVideo({ id, nomeVideo, linkVideo, thumbVideo});

    res.status(200).json(ytVideo);
}

export { listaYtVideos, criarYtVideo, deletarYtVideo, atualizarYtVideo };