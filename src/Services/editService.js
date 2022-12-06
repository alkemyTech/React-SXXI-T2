import axios from "axios";

export const onSubmitServicePUT = (
  id,
  name,
  file,
  shortDescription,
  longDescription,
  facebook_url,
  linkedin_url,
  instagram_url,
  twitter_url
) => {
  axios
    .put(`https://ongapi.alkemy.org/api/organization/${id}`, {
      name: name,
      logo: file,
      short_description: shortDescription,
      long_description: longDescription,
      facebook_url: facebook_url,
      linkedin_url: linkedin_url,
      instagram_url: instagram_url,
      twitter_url: twitter_url,
      group_id: 2,
    })
    .then((res) => {
      alert("Modificación exitosa");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onSubmitServiceWithoutImagePUT = (
  id,
  name,
  shortDescription,
  longDescription,
  facebook_url,
  linkedin_url,
  instagram_url,
  twitter_url
) => {
  axios
    .put(`https://ongapi.alkemy.org/api/organization/${id}`, {
      name: name,
      short_description: shortDescription,
      long_description: longDescription,
      facebook_url: facebook_url,
      linkedin_url: linkedin_url,
      instagram_url: instagram_url,
      twitter_url: twitter_url,
      group_id: 2,
    })
    .then((res) => {
      alert("Modificación exitosa");
    })
    .catch((error) => {
      console.log(error);
    });
};
