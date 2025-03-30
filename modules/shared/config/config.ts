class Config {
    // Fields
    public readonly dev_mode: boolean;
    public readonly db_connection_string: string;
    public readonly next_public_origin: string;
    public readonly jwt_secret: string  //secret key for jwt
    public readonly jwt_access_time: string //15m
    public readonly auth_cookie_expires: number // 5 * in five days
    public readonly ep_execution_time_limit: number //10000
    public readonly s3_endpoint: string
    public readonly s3_region: string
    public readonly s3_access_key_id: string
    public readonly s3_secret_access_key: string
    public readonly next_public_google_client_id: string;
    public readonly google_secret: string
    public readonly resend_email_api_key: string
    public readonly stripe_secret_key: string


    // Constructor
    constructor() {
        const dev_mode = process.env.DEV_MODE === 'true'
        const db_connection_string = process.env.DB_CONNECTION_STRING;
        const next_public_origin = process.env.NEXT_PUBLIC_ORIGIN;
        const jwt_secret = process.env.JWT_SECRET
        const jwt_access_time = process.env.JWT_ACCESS_TIME
        const auth_cookie_expires = process.env.AUTH_COOKIE_EXPIRES
        const ep_execution_time_limit = process.env.EP_EXECUTION_TIME_LIMIT
        const s3_endpoint = process.env.S3_ENDPOINT
        const s3_region = process.env.S3_REGION
        const s3_access_key_id = process.env.S3_ACCESS_KEY_ID
        const s3_secret_access_key = process.env.S3_SECRET_ACCESS_KEY
        const next_public_google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const google_secret = process.env.GOOGLE_SECRET
        const resend_email_api_key = process.env.RESEND_EMAIL_API_KEY
        const stripe_secret_key = process.env.STRIPE_SECRET_KEY

        if (
            !db_connection_string ||
            !next_public_origin ||
            !jwt_secret ||
            !jwt_access_time ||
            !auth_cookie_expires ||
            !ep_execution_time_limit ||
            !s3_endpoint ||
            !s3_region ||
            !s3_access_key_id ||
            !s3_secret_access_key ||
            !next_public_google_client_id ||
            !google_secret ||
            !resend_email_api_key ||
            !stripe_secret_key
        ) {
            throw new Error('Environment variables not set');
        }

        this.dev_mode = dev_mode
        this.db_connection_string = db_connection_string
        this.next_public_origin = next_public_origin
        this.jwt_secret = jwt_secret
        this.jwt_access_time = jwt_access_time
        this.auth_cookie_expires = Number(auth_cookie_expires)
        this.ep_execution_time_limit = Number(ep_execution_time_limit)
        this.s3_endpoint = s3_endpoint
        this.s3_region = s3_region
        this.s3_access_key_id = s3_access_key_id
        this.s3_secret_access_key = s3_secret_access_key
        this.next_public_google_client_id = next_public_google_client_id
        this.google_secret = google_secret
        this.resend_email_api_key = resend_email_api_key
        this.stripe_secret_key = stripe_secret_key
    }
}

const config = new Config()
export default config

