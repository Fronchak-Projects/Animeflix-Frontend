import { AxiosRequestConfig } from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import AnimeForm from "../../components/AnimeForm"
import { AnimeFormInputs } from "../../types/domain/AnimeFormInputs"
import { InvalidEntityError } from "../../types/domain/InvalidEntityError"
import { isInvalidEntityError, requestBackend } from "../../util/request"

const CreateAnimePage = () => {

  const [serverError, setServerError] = useState<InvalidEntityError | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (data: AnimeFormInputs) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/animes',
      withCredentials: true,
      data
    }
    requestBackend(config)
      .then((response) => {
        toast.success("Anime register with success");
        navigate(`/animes/${response.data.id}`);
      })
      .catch((e) => {
        toast.error('Error saving anime');
        const [isError, error] = isInvalidEntityError(e);
        if(isError) {
          console.log(error);
          setServerError(error);
        }
      })
  }

  return (
    <div className="container">
      <h1>Add new Anime</h1>
      <AnimeForm handleSubmitForm={handleSubmit} serverError={serverError ? serverError : undefined} />
    </div>
  );
}

export default CreateAnimePage;
