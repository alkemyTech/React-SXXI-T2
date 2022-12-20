import axios from 'axios'

export const onSubmitServicePUT = (id, name, description, image, due_date, updateImage) => {
  
    if ( updateImage === true ) {
        axios.put(`https://ongapi.alkemy.org/api/projects/${id}`, {
            title: name,
            description: description,
            image: image,
            due_date: due_date
        })
            .then((res) => {
                alert('Modificación exitosa');
            })
            .catch((error) => {
                console.log(error);
            })
  
    } else {
    axios
    .put(`https://ongapi.alkemy.org/public/api/projects/${id}`, {
        title: name,
        description: description,
        due_date: due_date
    })
    .then((res) => {
        alert('Modificación exitosa');
    })
    .catch((error) => {
        console.log(error);
    })
  } 
} 


  export const onSubmitServicePOST = (name, description, image, due_date, resetForm) => {
    axios
    .post(`https://ongapi.alkemy.org/public/api/projects`, {
        title: name,
        description: description,
        image: image,
        due_date: due_date
    })
    .then((res) => {
        alert('Creación exitosa');
        return resetForm();
    })
    .catch((error) => {
        console.log(error);
    })
  }


