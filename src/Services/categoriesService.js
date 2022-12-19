import { deleteData, getData, postData, putData } from './privateApiService';
import { successAlert } from './alertService';

export const onSubmitServicePUT = (id, name, description, image, updateImage) => {
    let body = {
        name: name,
        description: description,
        image: image
    }

    if (!updateImage) delete body.image

    putData('/categories', body, id)
        .then( data => {
            if (data)
                successAlert('Modificación exitosa',`La categoria ${data.data.name} fue modificada con éxito`,'Volver')
        })
}

export const onSubmitServicePOST = (name, description, resetForm, image) => {
    let body = {
        name: name,
        description: description,
        image: image
    }

    postData('/categories', body)
        .then((data) => {
            if (data) {
                successAlert('Creación exitosa',`La categoria ${data.data.name} fue creada con éxito`,'Volver')
                resetForm();
            }
        })
}

export const getCategories = async (id) => {
    let data
    await getData('/categories', id)
        .then( res => data = res)
    return data
}

export const deleteCategory = (id) => {
    deleteData('/categories', id)
        .then(successAlert('Eliminación exitosa','La categoria fue eliminada con éxito','Volver'))
}