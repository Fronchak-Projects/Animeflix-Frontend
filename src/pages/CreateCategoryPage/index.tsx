import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { CategoryFormInputs } from '../../types/domain/CategoryFormInputs';
import { InvalidEntityError } from '../../types/domain/InvalidEntityError';
import { isInvalidEntityError, requestBackend } from '../../util/request';


const CreateCategoryPage = () => {

  const navigate = useNavigate();
  const [serverError, setServerError] = useState<InvalidEntityError | null>(null);

  const handleSubmit = (data: CategoryFormInputs) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `/categories`,
      withCredentials: true,
      data
    }
    requestBackend(config)
      .then((response) => {
        toast.success("New category created");
        navigate(`/admin/categories/${response.data.id}`);
      })
      .catch((e) => {
        toast.error('Error trying to register new category');
        const [isEntityError, error] = isInvalidEntityError(e);
        if(isEntityError) {
          setServerError(error);
        }
      })
  }

  return (
    <div className="mt-2">
      <CategoryForm
        handleFormSubmit={handleSubmit}
        serverError={ serverError ? serverError : undefined }
      />
    </div>
  );
}

export default CreateCategoryPage;
