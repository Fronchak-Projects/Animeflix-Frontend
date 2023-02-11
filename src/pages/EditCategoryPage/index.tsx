import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { Category } from '../../types/domain/Category';
import { CategoryFormInputs } from '../../types/domain/CategoryFormInputs';
import { InvalidEntityError } from '../../types/domain/InvalidEntityError';
import { isInvalidEntityError, requestBackend } from '../../util/request';


const EditCategoryPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category | null>(null);
  const [serverError, setServerError] = useState<InvalidEntityError | null>(null);

  useEffect(() => {
    console.log('passou pelo useEffect');
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/categories/${id}`,
      withCredentials: true,
    }
    requestBackend(config)
    .then((response) => {
      setCategory(response.data);
    })
    .catch((e) => {
      toast.error("Error trying to get category info");
      navigate('/admin/categories', {
        replace: true
      });
    });
  }, [id]);

  const handleSubmit = (data: CategoryFormInputs) => {
    const config: AxiosRequestConfig = {
      method: 'put',
      url: `/categories/${id}`,
      withCredentials: true,
      data
    }
    requestBackend(config)
      .then(() => {
        toast.success("Category updated");
        navigate(`/admin/categories/${id}`);
      })
      .catch((e) => {
        toast.error('Error trying to update category');
        const [isEntityError, error] = isInvalidEntityError(e);
        if(isEntityError) {
          setServerError(error);
        }
      })
  }

  return (
    <div className="mt-2">
      { category === null ? <h1>Loading...</h1> : (
        <CategoryForm
          serverError={ serverError ? serverError : undefined }
          defaultValues={ category }
          handleFormSubmit={ handleSubmit }
        />
      ) }
    </div>
  );
}

export default EditCategoryPage;
