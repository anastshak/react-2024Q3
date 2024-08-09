import { Suspense } from 'react';
import CardDetailsWrapper from '../../components/Card-Details-Wrapper/Card-Details-Wrapper';
import Loader from '../../components/Loader/Loader';

export default function Details() {
  return (
    <Suspense fallback={<Loader />}>
      <CardDetailsWrapper />
    </Suspense>
  );
}
