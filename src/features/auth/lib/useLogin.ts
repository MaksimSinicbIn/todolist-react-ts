import { useFormik } from 'formik';
import { authThunks, selectIsLoggedIn } from '../model/authSlice';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoginType } from '../api/auth-api.types';

type FormikErrorType = Omit<Partial<LoginType>, 'captcha'>

export const useLogin = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            const isNotValid = !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)

            if (!values.email) {
                errors.email = 'Required'
            } else if (isNotValid) {
                errors.email = 'Email is not valid!'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 5) {
                errors.password = 'Must be more 4 symbols!'
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(authThunks.login(values))
            formik.resetForm()
        },
    })

    return { formik, isLoggedIn }
};