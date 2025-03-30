import signale from "signale";
import responses from "../constants/responses";
import config from "@/modules/shared/config/config";

/**
 * Wraps an API function with error handling and a timeout.
*/
const errorMiddleware = (func: () => Promise<any>, timeout?: number) => {
    const TIMEOUT = timeout || config.ep_execution_time_limit

    // Create a promise that rejects after 10 seconds
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Execution time exceeded 10 seconds'));
        }, TIMEOUT);
    });

    // Run those promises in parallel and return the result of the first one to finish
    return Promise.race([func(), timeoutPromise])
        .catch(error => {
            signale.error(error);
            console.error(error)
            return responses.errors.serverError;
        });
};
export default errorMiddleware;