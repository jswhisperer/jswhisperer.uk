// addEventListener("fetch", event => {
//     event.respondWith(handleRequest(event.request));
//   });
  
  export const onRequest = async (context) => {
    const request = context.request;
    const response = await fetch(request);
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'nonce-YOUR_NONCE'; style-src 'self' 'nonce-YOUR_NONCE'; img-src 'self' data:; connect-src 'self'");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
  }


  // Respond to OPTIONS method
// export const onRequestOptions: PagesFunction = async () => {
//     return new Response(null, {
//       status: 204,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "*",
//         "Access-Control-Allow-Methods": "GET, OPTIONS",
//         "Access-Control-Max-Age": "86400",
//       },
//     });
//   };
  
//   // Set CORS to all /api responses
//   export const onRequest: PagesFunction = async (context) => {
//     const response = await context.next();
//     response.headers.set("Access-Control-Allow-Origin", "*");
//     response.headers.set("Access-Control-Max-Age", "86400");
//     return response;
//   };