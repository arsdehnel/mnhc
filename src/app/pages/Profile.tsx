import StandardLayout from '@/app/layouts/standard';
import { RequestInfo } from 'rwsdk/worker';
import ProfileAuth from '@/app/components/profile-auth';
import ProfileNoAuth from '@/app/components/profile-no-auth';

export default function Profile({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="profile">
			<h2 className="page-title">
				Profile
			</h2>
			{
				ctx.user ?
					<ProfileAuth user={ ctx.user } /> :
					<ProfileNoAuth />
			}
		</StandardLayout>
	);
}
