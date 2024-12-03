import { gql, useQuery } from '@apollo/client';
import { QueryResult } from '../components';
import { ChangeEvent, FC, useState } from 'react';

const GET_DOGS = gql`
   query GetDogs {
    dogs{
      id
      breed
    }
   }
`



const DisplayDogs = () => {
   const [selectedDog, setSelectedDog] = useState<string | null>(null);


  const onDogSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedDog(e.target.value);
  }


  return <div>

    <h1>Display Dogs</h1>

    <Dogs onDogSelected={onDogSelected} />

  </div>;
};

export default DisplayDogs;


interface Dog {
  id: string;
  breed: string;
  displayImage?: string;
}

interface DogsProps {
  onDogSelected: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dogs: FC<DogsProps> = ({ onDogSelected }) => {

  const { loading, error, data } = useQuery(GET_DOGS);
  return (
    <QueryResult loading={loading} error={error} data={data}>
      <select name="dog" onChange={onDogSelected}>
        {data &&
          data.dogs.map((dog: Dog) => (
            <option key={dog.id} value={dog.breed}>
              {dog.breed}
            </option>
          ))}
      </select>
    </QueryResult>
  );
}