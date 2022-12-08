import axios from "axios";

export const onSubmitServicePUTEdit = (
  id,
  name,
  file,
  description,
) => {
  const body = {
    name: name,
    description: description,
    group_id: 2,

  };
  if (file) body.image = file;
  console.log(body);
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
    description: description,
    created_at: date,
  };
  if (file) body.image = file;
  console.log(body);
  axios
    .post(`https://ongapi.alkemy.org/api/activities`, body)
    .then((res) => {
      alert("Modificación exitosa");
    })
    .catch((error) => {
      console.log(error);
    });
};

