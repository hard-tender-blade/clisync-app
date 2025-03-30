//todo update status codes
const responses = {
    success: (obj: any) => new Response(JSON.stringify(obj), { status: 200, headers: { 'Content-Type': 'application/json' } }),
    successFile: (obj: ReadableStream) => new Response(obj, { status: 200 }),
    errors: {
        unauthorized: new Response("Unauthorized", { status: 401 }),
        forbidden: new Response("Forbidden", { status: 403 }),
        invalidRequest: new Response("Invalid input", { status: 400 }),
        notFound: new Response("No results found", { status: 404 }),
        serverError: new Response("Server error", { status: 500 }),
        alreadyExists: new Response("Already exists", { status: 409 }),
    }
}
export default responses