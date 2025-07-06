import { RequestInfo } from "rwsdk/worker";

import StandardLayout from '@/app/layouts/standard';

export default function Home({ ctx }: RequestInfo) {
  return (
    <StandardLayout currentBasePage="home">
			<h2 className="page-title">
				Home
			</h2>
    </StandardLayout>
  );
}
