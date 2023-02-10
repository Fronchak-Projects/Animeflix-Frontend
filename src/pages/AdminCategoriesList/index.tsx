import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData, ActionFunctionArgs, useNavigate } from 'react-router-dom';
import CategoryFilter from "../../components/CategoryFilter";
import ListLoader from "../../loaders/ListLoader";
import { Category } from "../../types/domain/Category";
import { CategoryName } from "../../types/domain/CategoryName";
import { requestAllCategoryNames, requestBackend } from "../../util/request";
import './styles.css';

const AdminCategoriesList = () => {

  const [categories, setCategories] = useState<CategoryName[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/categories',
      params: {
        filter
      }
    }
    setIsLoading(true)
    requestBackend(config)
      .then((response) => {
        setCategories(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [filter]);

  const handleChange = (filter: string) => {
    setFilter(filter);
  }

  const content = categories.map((category) => (
    <div key={category.id} className="col-12 mb-1">
      <Link to={String(category.id)}>
        <div className="alert alert-dark py-2" role="alert">
          { category.name }
        </div>
      </Link>
    </div>
  ));

  return (
    <div className="container-lg my-lg-3 m-xl-4 card" id="admin-categories-list-container">
      <div className="row my-4 align-items-center">
        <div className="col-12 col-md-10">
          <CategoryFilter filter={ filter } onClearFilter={() => setFilter('')} onChange={handleChange} />
        </div>
        <div className="col-12 col-md-2 mb-3 mb-md-0">
          <Link to="create" className="btn btn-primary w-100">Add</Link>
        </div>

      </div>
      <div className="row">
        { isLoading ? (
          <div className="col-12">
            <ListLoader />
          </div>
        ) : content }
      </div>
    </div>
  );
}

export default AdminCategoriesList;
