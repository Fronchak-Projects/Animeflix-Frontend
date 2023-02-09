import CardLoader from "../CardLoader"

const CardsLoader = () => {
  return (
    <div className="row row-cols-1 row-cols-sm-2 g-2 g-sm-3 g-md-4 row-cols-md-3 px-0">
      <div className="col text-center"><CardLoader /></div>
      <div className="col text-center"><CardLoader /></div>
      <div className="col text-center"><CardLoader /></div>
      <div className="col text-center"><CardLoader /></div>
    </div>
  );
}

export default CardsLoader;
