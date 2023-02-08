import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimeDetails from '../../components/AnimeDetails';
import { Anime } from '../../types/domain/Anime';
import { requestBackend } from '../../util/request';
import AnimeLoader from './AnimeLoader';


type Params = {
  id: string;
}

const AnimeDetailsPage = () => {

  const [anime, setAnime] = useState<Anime>();
  console.log(anime);

  const navigate = useNavigate();
  const { id } = useParams<Params>();


  useEffect(() => {
    console.log('Inicio do useEffect');
    const config: AxiosRequestConfig = {
      url: `/animes/${id}`,
      method: 'get'
    }
    requestBackend(config)
      .then((response) => {
        console.log(response);
        setAnime(response.data);
        console.log('Fim do useEffect');
      })
      .catch((e) => {
        console.log(e);
        throw new Response("Not Found", { status: 404 });
      })
  }, [id]);

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-12 mb-4">
          <button type="button" onClick={() => navigate(-1)} className="btn btn-primary">
            {"<- VOLTAR"}
          </button>
        </div>
        <div className="col-12">
          { anime === undefined ? <AnimeLoader /> : <AnimeDetails anime={ anime } /> }

        </div>
        <div className="col-12">
          RODAPÉ
        </div>
      </div>
    </div>
  );


}

export default AnimeDetailsPage;
