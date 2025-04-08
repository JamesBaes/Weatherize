import { Suspense } from 'react';
import ResultsClient from './resultsClient';

export default function ResultsPage() {
  return (
    <Suspense fallback={<p className="text-white">Loading...</p>}>
      <ResultsClient />
    </Suspense>
  );
}
