import { AxiosRequestConfig } from 'axios';
import { ActionFunctionArgs, redirect, useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from "../../components/CategoryForm";
import { Category } from '../../types/domain/Category';
import { DefaultDataError } from '../../types/vendor/DefaultDataError';
import { RequestError } from '../../types/vendor/RequestError';
import { requestBackend } from '../../util/request';


const CreateCategoryPage = () => {

  return (
    <div className="mt-2">
      <CategoryForm />
    </div>
  );
}

export default CreateCategoryPage;
