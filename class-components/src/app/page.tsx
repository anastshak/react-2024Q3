import { Suspense } from 'react';
import HomePage from './home/home';
import Loader from '../components/Loader/Loader';

export default function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <Suspense fallback={<Loader />}>
      <HomePage searchParams={searchParams} />
    </Suspense>
  );
}
