import ContentLoader from "react-content-loader"

const CardLoader = () => (
  <ContentLoader
    speed={1}
    width={280}
    height={350}
    viewBox="0 0 280 350"
    backgroundColor="#ccc"
    foregroundColor="#888"
  >
    <rect x="0" y="0" rx="2" ry="2" width="280" height="350" />
  </ContentLoader>
)

export default CardLoader

