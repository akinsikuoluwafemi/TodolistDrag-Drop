
import { Suspense, useState, useTransition } from "react";
import {
  gql,
  TypedDocumentNode,
  useApolloClient,
  useSuspenseQuery,
  useBackgroundQuery,
  useReadQuery,
  QueryRef,
} from "@apollo/client";
import { L } from "vitest/dist/chunks/reporters.C_zwCd4j.js";


// interface Data {
//   dog: {
//     id: string;
//     name: string;
//   }
// }

interface Data {
  dogs: {
    id: string;
    name: string;
  }
}

interface Dataa {
  dog: {
    id: string;
    name: string;
    breed: string;
  };
}

// fragment NameParts on Person {
//   firstName
//   lastName
// }

// query GetPerson {
//   people(id: "7"){
//     ...NameParts
//     avatar(size: LARGE)
//   }
// }



interface Variables {
  id: string;
}

// interface DogProps {
//   id: string;
// }

interface DogProps {
  id: string;
  queryRef: QueryRef<BreedData>;
}

interface PartialData {
  dog: {
    id: string;
    name: string;
    breed: string;
  }

}

const GET_DOG_QUERY: TypedDocumentNode<Dataa, Variables> = gql`
  query GetDog($id: String){
    dog(id: $id){
       # By default, an object's cache key is a combination of
      # its __typename and id fields, so we should always make
      # sure the id is in the response so our data can be
      # properly cached.
      id
      name
      breed
    }
  }
`;

const GET_DOGS_QUERY: TypedDocumentNode<Data, Variables> = gql`
  query GetDogs {
    dogs  {
      id
      name
    }
  }
`;

const GET_DOG_QUERY_PARTIAL: TypedDocumentNode<PartialData, Variables> = gql`
  query GetDog($id: String) {
    dog(id: $id) {
      id
      name
    }
  }
`;



// const FetchingWithSuspense = () => {
//  const [isPending, startTransition] = useTransition();
//   const { data } = useSuspenseQuery(GET_DOGS_QUERY) as { data: Data };
//   const [selectedDog, setSelectedDog] = useState(data.dogs[0].id);

//   console.log(isPending, 'isPending')

//   return (
//     <>
//       <select
//         style={{ opacity: isPending ? 0.5 : 1 }}
//         onChange={(e) => {
//           // setSelectedDog(e.target.value);
//           startTransition(() => {
//             setSelectedDog(e.target.value);
//           });
//         }}
//       >
//         {data.dogs?.map(({ id, name }) => (
//           <option key={id} value={id}>
//             {name}
//           </option>
//         ))}
//       </select>

//       <ErrorBoundary
//         fallback={<div>Something went wrong</div>}
//       >
//         <Suspense fallback={<div>Loading...</div>}>
//           <Dog id={selectedDog} />
//         </Suspense>
//       </ErrorBoundary>
//     </>
//   );
// };

const GET_BREEDS_QUERY: TypedDocumentNode<BreedData,Variables> = gql`
  query GetBreeds {
    breeds {
      id
      name
    }
  }
`;

interface BreedData {
  breeds: {
    id: string;
    name: string;
    characteristics: string[];
  }
}

// using useBackgroundQuery
const FetchingWithSuspense = () => {
const [queryRef] = useBackgroundQuery(GET_BREEDS_QUERY);

  return (
    <>
    

        <Suspense fallback={<div>Loading...</div>}>
        <Dog id="3"
          queryRef={queryRef}
        />
        </Suspense>
    </>
  );
};





// write partial data for Buck to the cache so it is available when Dog renders
// const FetchingWithSuspense = () => {
// //  const client =  useApolloClient();

// //     client.cache.writeQuery({
// //       query: GET_DOG_QUERY_PARTIAL,
// //       variables: { id: "1" },
// //       data: {
// //         dog: {
// //           id: "1", name: "Buck",
// //           breed: "bulldog"
// //        } },
// //     });

//       <Suspense fallback={<div>Loading...</div>}>
//         <Dog id="1" />
//       </Suspense>
// };

export default FetchingWithSuspense;


// function Dog({ id }: DogProps) {
//   const { data } = useSuspenseQuery(GET_DOG_QUERY, {
//     variables: { id },
//     // returnPartialData: true,
//   });

//   return (
//     <>
//       <div>Name: {data?.dog?.name}</div>
//       <div>Breed: {data?.dog?.breed}</div>
//     </>
//   );
// }

function Dog({ id, queryRef }: DogProps) {
  const { data } = useSuspenseQuery(GET_DOG_QUERY, {
    variables: { id },
    // returnPartialData: true,
  });

  return (
    <>
      <div>Name: {data?.dog?.name}</div>
      <Suspense fallback={<div>Loading breeds ...</div>}>
        <Breeds queryRef={queryRef} />
      </Suspense>
    </>
  );
}

interface BreedsProps { 
  queryRef: QueryRef<BreedData>
}

function Breeds({ queryRef }: BreedsProps) {
  const { data } = useReadQuery(queryRef);

  console.log(data, 'data')

  return data.breeds.breeds?.map(({ characteristics }) =>
    characteristics.map((characteristic) => (
      <div key={characteristic}>{characteristic}</div>
    ))
  );

}