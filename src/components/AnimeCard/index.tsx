import AnimeNota from "../AnimeNota";
import './styles.css';

type Props = {
  anime: {
    name: string;
    imgUrl: string;
    avaliation: number;
  }
}

const AnimeCard = ( {anime} : Props ) => {
  return (
    <div className="card d-flex flex-column justify-content-between h-100">
      <img src={ anime.imgUrl } className="card-img-top card-image"/>
      <div className="card-body d-flex flex-column flex-1 justify-content-end">
        <h5 className="card-title">{ anime.name }</h5>
        <AnimeNota avaliation={ anime.avaliation } />
      </div>
    </div>
  );
}

export default AnimeCard;
