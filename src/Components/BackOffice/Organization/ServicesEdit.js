import axios from "axios"

export const onSubmitServicePUT = (id,name,img,shortDescription,longDescription,facebook_url,linkedin_url,instagram_url,twitter_url) => {

        axios.put(`https://ongapi.alkemy.org/api/organization/${id}`, {
            name: name,
            logo: img,
            short_description: shortDescription,
            long_description: longDescription,
            facebook_url: facebook_url,
            linkedin_url: linkedin_url,
            instagram_url: instagram_url,
            twitter_url: twitter_url,
            group_id: 2,  
        })
            .then((res) => {
                alert('Modificación exitosa');
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    
}

