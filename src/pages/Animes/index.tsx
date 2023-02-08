import { Link, useLoaderData, redirect, LoaderFunctionArgs, useNavigate, useNavigation } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import AnimeCard from "../../components/AnimeCard";
import { getParamsToAnimePageFromRequest, requestAllCategoryNames, requestBackend } from '../../util/request';
import { SpringPage } from '../../types/vendor/StringPage';
import AnimeFilter from '../../components/AnimeFilter';
import { CategoryName } from '../../types/domain/CategoryName';
import { AnimeFilterData } from '../../types/domain/AnimeFilterData';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import AnimeLoader from './AnimeLoader';
import { toast } from 'react-toastify';

type Anime = {
  id: number,
  name: string;
  imgUrl: string;
  avaliation: number;
}



const Animes = () => {

  const [page, setPage] = useState<SpringPage<Anime>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getAnimes = async() => {
      try {
        const config: AxiosRequestConfig = {
          method: 'get',
          url: '/animes',
          params: {
            page: 0,
            size: 4
          }
        };
        setIsLoading(true);
        const response = await requestBackend(config);
        setPage(response.data);
        setIsLoading(false);
        console.log(response.data);
      }
      catch(e) {
        setIsLoading(false);
        toast.error('Erro ao carregar a página');
        navigate('/');
      }
    }
    getAnimes();
  }, []);

  const content = () => {
    return page?.content.map((anime) => {
      return (
        <Link to={anime.id + ''} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3" key={anime.id}>
          <div>
            <AnimeCard anime={anime} />
          </div>
        </Link>
      );
    });
  }

  return (
    <div className="container-fluid p-0">
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <h1>Animes</h1>
          </div>

          { isLoading ? (
            <div className="d-flex justify-content-center">
              <AnimeLoader />
            </div>
          ) : content() }
        </div>
      </div>

    </div>
  );

}

export default Animes;
