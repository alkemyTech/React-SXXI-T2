import { SubscribeForm } from "../SubscribeForm/SubscribeForm"
import '../FormStyles.css';
export function Footer() {
    return (
        <div className="footer-container">
            <div className="subscribe-form" >
                {localStorage.getItem("subscribeInfo") === null && <SubscribeForm/>}
            </div>
        </div>
    )
}