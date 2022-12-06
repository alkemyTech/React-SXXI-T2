import axios from "axios";

export const onSubmitServicePUT = (
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
