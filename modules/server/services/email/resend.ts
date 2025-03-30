import config from "@/modules/shared/config/config";
import { Resend } from "resend";

const resend = new Resend(config.resend_email_api_key);
export default resend;
