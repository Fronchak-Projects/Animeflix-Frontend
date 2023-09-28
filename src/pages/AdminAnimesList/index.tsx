import { AxiosRequestConfig } from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimeCrudCard from "../../components/AnimeCrudCard";
import AnimeFilter from "../../components/AnimeFilter";
import Pagination from "../../components/Pagination";
import CardsLoader from "../../loaders/CardsLoader";
import { Anime } from "../../types/domain/Anime";
import { AnimeFilterData } from "../../types/domain/AnimeFilterData";
import { SpringPage } from "../../types/vendor/StringPage";
import { requestBackend } from "../../util/request";

const AdminAnimesList = () => {

  const [page, setPage] = useState<SpringPage<Anime>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animeFilterData, setAnimeFilterData] = useState<AnimeFilterData>({
    pageNumber: 0,
    category: 0,
    filter: ''
  });

  const getAnimes = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/animes',
      params: {
        size: 6,
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

  const content = page?.content.map((anime) => (
    <div className="col" key={anime.id}>
      <AnimeCrudCard anime={ anime } />
    </div>
  ));

  return (
    <div >
      <div className="row align-items-center mb-4 gx-lg-2 mt-3">
        <div className="col-12 col-md-2 col-lg-1">
          <Link to="create" className="btn btn-primary d-block">ADD</Link>
        </div>
        <div className="col-12 col-md-10 col-lg-11">
          <AnimeFilter
            onClearFilters={ handleClearFilters }
            categoryFilter={ animeFilterData.category }
            textFilter={ animeFilterData.filter }
            onTextFilterChange={ handleFilterTextChange }
            onCategoryChange={ handleCategoryChange }
          />
        </div>
      </div>
      { isLoading ? (
        <div className="col-12">
          <CardsLoader />
        </div>

      ) : (
        <div className="row row-cols-1 row-cols-sm-2 g-2 g-sm-3 g-md-4 row-cols-md-3">
          {content }
        </div>
      ) }

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

export default AdminAnimesList;
