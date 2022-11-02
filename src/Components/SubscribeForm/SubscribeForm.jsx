import { Card } from 'antd';
import { useFormik } from 'formik';
import { basicSchema } from './subscribeSchema';
import '../../Components/FormStyles.css';

const onSubmit = async (values, actions) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const subscribeData = values;
    actions.resetForm();
    console.log(subscribeData);
    localStorage.setItem("subscribeInfo", JSON.stringify(subscribeData));
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
        <Card size="small" title="Suscríbete al newsletter!">
            <form onSubmit={handleSubmit} className="subscribe-container">
                <div className='inputs'>
                    <input type="text"
                        className={errors.firstName && touched.firstName ? "input-error card input-field" : "input-field card"}
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Nombre"
                        value={values.firstName} />
                    {errors.firstName && touched.firstName && <p className="input-error">{errors.firstName}</p>}
                </div>

                <div className='inputs'>
                    <input type="email"
                        name="email"
                        className={errors.email && touched.email ? "input-error card input-field" : "input-field card"}
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email} />
                    {errors.email && touched.email && <p className="input-error">{errors.email}</p>}
                </div>
                <button disabled={isSubmitting} className="submit-btn card" type="submit">Suscribirme</button>
            </form>
        </Card>

    )
}

