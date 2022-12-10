import axios from "axios";

export const onSubmitServicePUTEdit = (
  id,
  name,
  file,
  description,
  date,
) => {
  const body = {
    name: name,
    description: description,
    updated_at: date,
    group_id: 2,

  };
  if (file) body.image = file;
  axios
    .put(`https://ongapi.alkemy.org/api/activities/${id}`, body)
    .then((res) => {
      alert("Modificación exitosa");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onSubmitServicePUTCreate = (
  newID,
  name,
  description,
  file,
  date,

) => {
  const body = {
    id: newID,
    name: name,
    image: file,
    description: description,
    created_at: date,
    user_id: 0,
    category_id: 0
  };
  axios
    .post(`https://ongapi.alkemy.org/api/activities`, body)
    .then((res) => {
      alert("Creación exitosa");
    })
    .catch((error) => {
      console.log(error);
    });
};

