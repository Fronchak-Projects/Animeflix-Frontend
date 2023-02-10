import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../../types/domain/Category";
import { requestBackend } from "../../util/request";
import './styles.css';


const AdminCategoryDetails = () => {

  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/categories/${id}`,
      withCredentials: true
    }
    setIsLoading(true)
    requestBackend(config)
      .then((response) => {
        setCategory(response.data);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="col-12 p-3 card mt-3" id="admin-category-details-container">
      { isLoading ? <h1>Loading...</h1> : (category && (
        <>
          <h1>{ category.name }</h1>
          <p>{ category.description }</p>
          <hr></hr>
          <div id="category-buttons-container">
            <Link to={`/admin/categories/edit/${ category.id }`} className="btn btn-primary">Edit</Link>
            <Link to={`/admin/categories/delete/${ category.id }`} className="btn btn-danger">Delete</Link>
          </div>
        </>
      ))}
    </div>
  );
}

export default AdminCategoryDetails;
