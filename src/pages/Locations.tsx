
import { useQuery, gql } from '@apollo/client';
import { QueryResult } from '../components';


const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }

`;

interface Locations {
  id: string;
  name: string;
  description: string;
  photo: string;
}

const DisplayLocations = () => {

  const { loading, error, data } = useQuery(GET_LOCATIONS);
  
  console.log(data, "data");

  return (
    <QueryResult loading={loading} error={error} data={data}>
      {data &&
        data?.locations.map(({ id, name, description, photo }: Locations) => (
          <div
            key={id}
            style={{ margin: "1rem", padding: "1rem" }}
          >
            <h3>{name}</h3>
            <img
              width="400"
              height="250"
              alt="location-reference"
              src={`${photo}`}
            />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
          </div>
        ))}
    </QueryResult>
  );
};

export default DisplayLocations;
