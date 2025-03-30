import { permanentRedirect } from "next/navigation";

export default function permanentRedirectSessionExpired(
    redirect: string
) {
    permanentRedirect(`/sign-in?sessionExpired=true&redirect=${redirect}`);
}