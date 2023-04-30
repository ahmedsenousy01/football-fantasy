import { FC, useState } from 'react';
import Form from '@/components/Form/Form';
import Field from '@/components/Field/Field';
import loginRequest, {
	LoginDetails,
} from '@/api/requests/authentication/login';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails } from '@/store/User/User.slice';
import { setAuthToken } from '@/utils/auth/authorization';

const Login: FC = () => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (formResult: any) => {
		setLoading(true);
		const response = await loginRequest(formResult as LoginDetails);
		console.log(response);
		return response;
	};

	const onSuccess = (data: unknown) => {
		console.log(data);
		const { data: loginResponseData } = data as {
			data: { auth_token: string; message: string };
		};
		setAuthToken(loginResponseData.auth_token);
		dispatch(fetchUserDetails());
	};

	return (
		<Form id={'login'} onSubmit={onSubmit} onSuccess={onSuccess}>
			<Field name={'email'} label={'email'} type={'text'} />
			<Field name={'password'} label={'password'} type={'password'} />
			<button role={'submit'}>Submit</button>
		</Form>
	);
};
export default Login;
