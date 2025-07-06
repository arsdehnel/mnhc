import StandardLayout from '@/app/layouts/standard';
import { RequestInfo } from 'rwsdk/worker';
import UserProfile from '../components/user-profile';
import { link } from '@/app/shared/links';

export default function Profile({ ctx }: RequestInfo) {
	return (
		<StandardLayout currentBasePage="profile">
			<h2 className="page-title">
				Profile
			</h2>
			{
				ctx.user ?
					<UserProfile user={ ctx.user } /> :
					<div>
						<a href={ link("/register") }>Register</a>
						<a href={ link("/login") }>Login</a>
					</div>
			}
		</StandardLayout>
	);
}
