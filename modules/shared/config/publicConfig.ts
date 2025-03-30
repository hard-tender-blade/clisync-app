class PublicConfig {
    // Fields
    public readonly next_public_origin: string;
    public readonly next_public_google_client_id: string;

    // Constructor
    constructor() {
        const next_public_origin = process.env.NEXT_PUBLIC_ORIGIN;
        const next_public_google_client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

        if (
            !next_public_origin ||
            !next_public_google_client_id
        ) {
            throw new Error('Environment variables not set');
        }

        this.next_public_origin = next_public_origin
        this.next_public_google_client_id = next_public_google_client_id
    }
}

const publicConfig = new PublicConfig()
export default publicConfig

