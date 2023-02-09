import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AnimeDetails from '../../components/AnimeDetails';
import { Anime } from '../../types/domain/Anime';
import { requestBackend } from '../../util/request';
import AnimeDetailsLoader from './AnimeDetailsLoader';


type Params = {
  id: string;
}

const AnimeDetailsPage = () => {

  const [anime, setAnime] = useState<Anime>();
  console.log(anime);

  const navigate = useNavigate();
  const { id } = useParams<Params>();

  const getProduct = async() => {
    try {
      const config: AxiosRequestConfig = {
        url: `/animes/${id}`,
        method: 'get'
      }
      const response = await requestBackend(config);
      const data = response.data;
      setAnime(data);
    }
    catch(e) {
      console.log('erro');
      toast.error('Erro ao carregar a página');
      navigate('/');


    }
  }

  useEffect(() => {
    console.log('Inicio do useEffect');
    getProduct();
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
          { anime === undefined ? <AnimeDetailsLoader /> : <AnimeDetails anime={ anime } /> }

        </div>
        <div className="col-12">
          RODAPÉ
        </div>
      </div>
    </div>
  );


}

export default AnimeDetailsPage;
