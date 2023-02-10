import './styles.css';

type Props = {
  filter: string,
  onClearFilter: () => void,
  onChange: (filter: string) => void
}

const CategoryFilter = ({ filter, onClearFilter, onChange }: Props) => {

  return (
    <div id="category-filter-form" className="col-12">
      <div className="row">
        <div className="col-8 col-sm-9 col-md-10">
          <input
            type="search"
            id="filter"
            name="filter"
            className="form-control"
            placeholder="Search"
            value={filter}
            onChange={(event) => onChange(event.target.value)}
          ></input>
        </div>
        <div className="col-4 col-sm-3 col-md-2">
          <button type="button" className="btn btn-secondary w-100" onClick={() => onClearFilter()}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
