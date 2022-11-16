import { useEffect, useState } from "react";
import axios from 'axios';
import { Card } from "antd";
import { LinkedinOutlined, FacebookOutlined } from "@ant-design/icons";

export function ListMembers() {

    const API_URL = "https://ongapi.alkemy.org/api/";
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const { data } = await axios.get(API_URL+"members");
            const results = data.data.map((value) => {
                return {
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
            <li className="card-members">
                {members.map((member) => {
                    return (
                        <ul>
                            <Card size="default" title={member.name} key={member.name} className="individual-card">
                                <div className="card-content">
                                    <img src={member.image} alt={member.name} className="member-image" />
                                    <div className="info">
                                        <p>{member.description.replace(/<\/?[^>]+>/gi, '')}</p>
                                        <a href={member.facebookUrl} className="member-link"><FacebookOutlined /></a>
                                        <a href={member.linkedinUrl} className="member-link"><LinkedinOutlined /></a>
                                    </div>
                                </div>
                            </Card>
                        </ul>
                    );
                })}
            </li>
    )
}