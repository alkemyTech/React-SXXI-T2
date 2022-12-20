import axios from "axios";
import { useEffect, useState } from "react";

export function MembersCards() {

    const API_URL = "https://ongapi.alkemy.org/api/";
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get(API_URL + "members");
            const results = data.data.map((value) => {
                return {
                    id: value.id,
                    name: value.name,
                    image: value.image,
                    description: value.description,
                    facebookUrl: value.facebookUrl,
                    linkedinUrl: value.linkedinUrl
                }
            });


            setMembers(results)
        }
        fetchData();
    }, []);

  return (
    <div className="members-cards-container">
        
    </div>
  )
}
