import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimeCrudCard from "../../components/AnimeCrudCard";
import AnimeFilter from "../../components/AnimeFilter";
import Pagination from "../../components/Pagination";
import CardsLoader from "../../loaders/CardsLoader";
import { Anime } from "../../types/domain/Anime";
import { AnimeFilterData } from "../../types/domain/AnimeFilterData";
import { CategoryName } from "../../types/domain/CategoryName";
import { SpringPage } from "../../types/vendor/StringPage";
import { requestBackend } from "../../util/request";
import AnimesLoader from '../Animes/AnimesLoader';




const AdminAnimesList = () => {

  const [page, setPage] = useState<SpringPage<Anime>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getAnimes = (pageNumber: number) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/animes',
      params: {
        size: 2,
        page: pageNumber
      }
    }
    setIsLoading(true);
    requestBackend(config)
      .then((response) => {
        setPage(response.data);
      })
      .catch((e) => toast.error('Erro na requisição'))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getAnimes(0);
  }, []);

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
          <AnimeFilter categories={[]} handleClearFilter={() => navigate('/admin/animes')} />
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
            onPageChange={getAnimes}
          />
        ) }
      </div>

    </div>
  );
}

export default AdminAnimesList;
