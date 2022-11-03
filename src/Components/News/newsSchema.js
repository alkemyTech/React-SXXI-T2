import * as Yup from 'yup';

const REQUIRED = '* Campo obligatorio';

export const basicSchema = Yup.object().shape({
    title: Yup
        .string()
        .min(3, 'Mínimo 3 caracteres')
        .required(REQUIRED),
    content: Yup
        .string()
        .required(REQUIRED),
    category: Yup
        .string()
        .required(REQUIRED),
    image: Yup
        .mixed()
        .required(REQUIRED)

});