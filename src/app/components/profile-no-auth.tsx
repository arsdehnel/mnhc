import { link } from '@/app/shared/links';

export default function ProfileNoAuth() {
    return (
        <>
            <div>
                You are not currently logged in.
            </div>
            <div className='profile-no-auth-links'>
                <a className="link-button" href={ link("/register") }>Register</a>
                <a className="link-button" href={ link("/login") }>Log In</a>
            </div>
        </>
    )
}