import  { FC, PropsWithChildren, ReactElement } from 'react';
import { ApolloError } from '@apollo/client';


interface QueryResultProps {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: unknown;
}

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
}



const QueryResult: FC<PropsWithChildren<QueryResultProps>> = ({ loading, error, data, children }): ReactElement<any, any> | null => {
  if (error) {
    return <p>ERROR: {error.message}</p>;
  }

  if (loading) {
    return (
      <p style={styles}>Loading...</p>
    )
  }

  if (data) {
    return <>{children}</>;
  }

  return <p>Nothing to show...</p>;
};

export default QueryResult;


