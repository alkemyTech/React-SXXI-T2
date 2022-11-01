import * as Yup from 'yup';

const REQUIRED = '* Campo obligatorio';
const MIN_CHAR = 'Debe contener al menos seis caracteres';
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/

export const basicSchema = Yup.object().shape({
    fullname: Yup
        .string()
        .required(REQUIRED),
    email: Yup
        .string()
        .email('Por favor ingrese un correo válido')
        .required(REQUIRED),
    password: Yup
        .string()
        .min(6, MIN_CHAR)
        .matches(PASSWORD_REGEX, 'Por favor ingrese una contraseña más fuerte')
        .required(REQUIRED),
    repassword: Yup
        .string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required(REQUIRED)

});