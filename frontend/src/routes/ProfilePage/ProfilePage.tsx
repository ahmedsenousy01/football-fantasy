import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectUserDetails } from '@/store/User/User.slice';

const ProfilePage: FC = () => {
	const userDetails = useSelector(selectUserDetails);

	return (
		<div className="page-wrapper page-wrapper d-flex justify-content-center align-items-center">
			{Object.entries(userDetails ?? {}).map((entry) => {
				const key = entry[0];
				const value = entry[1] as string;
				return (
					<div key={key}>
						<b>{key}</b> <span className="muted">{value}</span>
					</div>
				);
			})}
		</div>
	);
};

export default ProfilePage;
