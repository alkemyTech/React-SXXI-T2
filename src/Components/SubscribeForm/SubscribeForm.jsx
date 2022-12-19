import { Card } from 'antd';
import { useFormik } from 'formik';
import { basicSchema } from './subscribeSchema';
import { successAlert } from '../../Services/alertService';

const onSubmit = async (values, actions) => {
    const subscribeData = values;
    actions.resetForm();
    localStorage.setItem("subscribeInfo", JSON.stringify(subscribeData));
    successAlert("¡Felicidades!", "Te has suscrito exitosamente.", "¡:)!");
}
export function SubscribeForm() {

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: '',
            email: '',
        },
        validationSchema: basicSchema,
        onSubmit
    });

    return (
        <Card size="small" title="Suscríbete al newsletter!" className='container-card'>
            <form onSubmit={handleSubmit} className="subscribe-container">
                <div className='inputs'>
                    <input type="text"
                        className={errors.firstName && touched.firstName ? "input-subs-error input-subs-field" : "input-subs-field"}
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre"
                        value={values.firstName} />
                    {errors.firstName && touched.firstName && <p className="input-error">{errors.firstName}</p>}
                </div>

                <div className='subs-inputs'>
                    <input type="email"
                        name="email"
                        className={errors.email && touched.email ? "input-subs-error input-subs-field" : "input-subs-field"}
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                    {errors.email && touched.email && <p className="input-error">{errors.email}</p>}
                </div>
                <button disabled={isSubmitting} className="subscribe-btn" type="submit">Suscribirme</button>
            </form>
        </Card>
    )
}

