import { Link, useLoaderData, redirect, LoaderFunctionArgs, useNavigate, useNavigation } from 'react-router-dom';
import { AxiosRequestConfig } from 'axios';
import AnimeCard from "../../components/AnimeCard";
import { getParamsToAnimePageFromRequest, requestAllCategoryNames, requestBackend } from '../../util/request';
import { SpringPage } from '../../types/vendor/StringPage';
import AnimeFilter from '../../components/AnimeFilter';
import { CategoryName } from '../../types/domain/CategoryName';
import { AnimeFilterData } from '../../types/domain/AnimeFilterData';
import { useEffect } from 'react';
import Pagination from '../../components/Pagination';
import AnimeLoader from './AnimeLoader';

type Anime = {
  id: number,
  name: string;
  imgUrl: string;
  avaliation: number;
}



const Animes = () => {


  return (
    <h1>Animes Page</h1>
  )

}

export default Animes;
