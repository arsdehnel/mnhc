import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Home({ ctx }: RequestInfo) {
  return (
    <StandardLayout ctx={ ctx }>
      <p>
        Home
      </p>
    </StandardLayout>
  );
}
