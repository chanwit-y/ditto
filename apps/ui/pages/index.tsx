// import styles from './index.module.css';

import { getData } from '@ditto/firebase';
import { InferGetStaticPropsType } from 'next';
import { useEffect } from 'react';

export function Index({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return <div>{JSON.stringify(data, undefined, 2)}</div>;
}

export async function getStaticProps() {
  const data = await getData();
  
  return {
    props: { data: data },
  };
}

export default Index;
