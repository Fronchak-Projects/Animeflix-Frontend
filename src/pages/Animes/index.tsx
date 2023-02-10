import { Link, useLoaderData, redirect, LoaderFunctionArgs, useNavigate, useNavigation } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import AnimeCard from "../../components/AnimeCard";
import { getParamsToAnimePageFromRequest, requestAllCategoryNames, requestBackend } from '../../util/request';
import { SpringPage } from '../../types/vendor/StringPage';
import { useEffect, useState, useCallback } from 'react';
import Pagination from '../../components/Pagination';
import AnimesLoader from './AnimesLoader';
import { toast } from 'react-toastify';
import { AnimeFilterData } from '../../types/domain/AnimeFilterData';
import AnimeFilter from '../../components/AnimeFilter';

type Anime = {
  id: number,
  name: string;
  imgUrl: string;
  avaliation: number;
}



const Animes = () => {

  const [page, setPage] = useState<SpringPage<Anime>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animeFilterData, setAnimeFilterData] = useState<AnimeFilterData>({
    pageNumber: 0,
    category: 0,
    filter: ''
  });
  const navigate = useNavigate();

  const getAnimes = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/animes',
      params: {
        size: 4,
        page: animeFilterData.pageNumber,
        filter: animeFilterData.filter,
        categoryId: animeFilterData.category
      }
    }
    setIsLoading(true);
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
      .catch((e) => toast.error('Erro na requisição'))
      .finally(() => setIsLoading(false));
  }, [animeFilterData]);


  useEffect(() => {
    getAnimes();
  }, [getAnimes]);

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

  const handlePageChange = (selectPage: number) => {
    setAnimeFilterData((state) => {
      return {
        category: state.category,
        filter: state.filter,
        pageNumber: selectPage
      }
    });
  }

  const handleCategoryChange = (category: number) => {
    setAnimeFilterData((prevState) => {
      return {
        category: category,
        filter: prevState.filter,
        pageNumber: 0
      }
    });
  }

  const handleFilterTextChange = (filter: string) => {
    setAnimeFilterData((prevState) => {
      return {
        category: prevState.category,
        filter: filter,
        pageNumber: 0
      }
    });
  }

  const handleClearFilters = () => {
    setAnimeFilterData({
      category: 0,
      filter: '',
      pageNumber: 0
    });
  }

  return (
    <div className="container-fluid p-0">
      <div className="container py-3">
        <div className="row">
          <div className="col-12">
            <h1>Animes</h1>
          </div>
          <div className="col-12">
            <AnimeFilter
              onTextFilterChange={handleFilterTextChange}
              categoryFilter={ animeFilterData.category }
              textFilter={ animeFilterData.filter }
              onClearFilters={ handleClearFilters }
              onCategoryChange={handleCategoryChange}
            />
          </div>
          { isLoading ? (
            <div className="d-flex ">
              <AnimesLoader />
            </div>
          ) : content() }
        </div>
      </div>
      <div className="col-12 mt-3">
        { !isLoading && page !== undefined && (
          <Pagination
            activePage={page.number}
            pageCount={page.totalPages}
            onPageChange={handlePageChange}
          />
        ) }
      </div>
    </div>
  );

}

export default Animes;
