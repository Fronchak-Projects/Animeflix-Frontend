import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useLoaderData, ActionFunctionArgs, redirect, useActionData, LoaderFunctionArgs, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AnimeForm from "../../components/AnimeForm";
import { Anime } from '../../types/domain/Anime';
import { AnimeFormInputs } from '../../types/domain/AnimeFormInputs';
import { CategoryName } from '../../types/domain/CategoryName';
import { InvalidEntityError } from '../../types/domain/InvalidEntityError';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { isInvalidEntityError, requestAllCategoryNames, requestBackend } from '../../util/request';

const EditAnimePage = () => {

  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [serverError, setServerError] = useState<InvalidEntityError | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/animes/${id}`,
      withCredentials: true
    }
    requestBackend(config)
      .then((response) => {
        setAnime(response.data);
      })
      .catch((e) => {
        console.log(e);
        toast.error('Erro ao buscar informações do anime');
        navigate(-1);
      });
  }, [id]);

  const handleSubmit = (data: AnimeFormInputs) => {
    const config: AxiosRequestConfig = {
      method: 'put',
      url: `/animes/${id}`,
      withCredentials: true,
      data
    }
    requestBackend(config)
      .then(() => {
        toast.success('Anime updated with success');
        navigate(`/animes/${id}`);
      })
      .catch((e) => {
        toast.error('Error updating anime');
        const [isInvalidError, error] = isInvalidEntityError(e);
        if(isInvalidError) {
          setServerError(error);
        }
      })
  }

  return (
    <div className="m-2 p-2">
      { anime === null ? <h1>Loading form ...</h1> : (
        <AnimeForm
          defaultValues={anime}
          handleSubmitForm={ handleSubmit }
          serverError={ serverError ? serverError : undefined }
        />
      ) }
    </div>
  );
}

export default EditAnimePage;
