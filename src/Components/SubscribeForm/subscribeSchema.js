import * as Yup from 'yup';

const REQUIRED = '* Campo obligatorio';

export const basicSchema = Yup.object().shape({
    firstName: Yup
        .string()
        .required(REQUIRED),
    email: Yup
        .string()
        .email('Por favor ingrese un correo válido')
        .required(REQUIRED),
});