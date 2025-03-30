import config from "@/modules/shared/config/config";
import { OAuth2Client } from "google-auth-library";

const GoogleOAuth2Client = new OAuth2Client(
    config.next_public_google_client_id,
    config.google_secret,
    'postmessage',
)

export default GoogleOAuth2Client;