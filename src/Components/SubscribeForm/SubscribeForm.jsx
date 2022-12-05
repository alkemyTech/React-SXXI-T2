import { Card } from 'antd';
import { useFormik } from 'formik';
import { basicSchema } from './subscribeSchema';
import { Modal } from 'antd';

const onSubmit = async (values, actions) => {
    const subscribeData = values;
    actions.resetForm();
    localStorage.setItem("subscribeInfo", JSON.stringify(subscribeData));
    success();
    
}

const success = () => {
    Modal.success({
      content: 'Has sido suscrito!',
    });
  };

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
                <button disabled={isSubmitting} className="subscribe-btn" type="submit">Suscribirme</button>
            </form>
        </Card>

    )
}

