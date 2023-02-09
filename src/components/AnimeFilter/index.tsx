import { AxiosRequestConfig } from 'axios';
import { useState, useEffect } from 'react';
import { CategoryName } from "../../types/domain/CategoryName";
import { requestBackend } from '../../util/request';
import './styles.css';

type Props = {
  handleClearFilter: Function;
  textFilter: string;
  categoryFilter: number;
  onTextFilterChange: (filter: string) => void;
  onCategoryChange: (category: number) => void;
}

const AnimeFilter = ({ handleClearFilter, textFilter, categoryFilter, onTextFilterChange, onCategoryChange }: Props) => {

  const [categories, setCategories] = useState<CategoryName[]>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: '/categories/all'
    };
    requestBackend(config)
      .then((response) => {
        setCategories(response.data);
      })
  }, []);

  return (
    <div id="product-filter-container" className="col-12 py-2">
      <form className="row">
        <div className="col-12 col-md-5 col-xl-6 mb-2 mb-md-0">
          <input
            type="text"
            name="filter"
            id="filter"
            placeholder="Search"
            className="form-control"
            defaultValue={ textFilter }
            onChange={(event) => onTextFilterChange(event.target.value)}
          ></input>
        </div>
        <div className="col-9 col-md-5">
          <select
            className="form-select"
            id="categoryId"
            name="categoryId"
            defaultValue={ categoryFilter }
            onChange={(event) => onCategoryChange(Number(event.target.value))}
          >
            <option value={0}>Category</option>
            { categories?.map((category) => <option key={category.id} value={category.id}>{ category.name }</option>) }
          </select>
        </div>
        <div className="col-3 col-md-2 col-xl-1">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => handleClearFilter()}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimeFilter;
