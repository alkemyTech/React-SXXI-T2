import { Card } from "antd";
import { LinkedinOutlined, FacebookOutlined } from "@ant-design/icons";

export function ListMembers(props) {

    const { latestMembers } = props;

    return (
        <li className="card-members">
            {latestMembers.map((member) => {
                return (
                    <ul key={member.id}>
                        <Card size="default" title={member.name} key={member.name} className="individual-member-card">
                            <div className="card-content">
                                <div className="member-image-div" >
                                    <img src={member.image} alt={member.name} className="member-image" />
                                </div>
                                <div className="info">
                                    <p>{member.description.replace(/<\/?[^>]+>/gi, '')}</p>
                                    <div className="members-links">
                                        <a href={member.facebookUrl} className="member-link"><FacebookOutlined /></a>
                                        <a href={member.linkedinUrl} className="member-link"><LinkedinOutlined /></a>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </ul>
                );
            })}
        </li>
    )
}