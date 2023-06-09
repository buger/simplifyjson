export async function onRequest(context) {
  if (context.request.method == "GET") {
    return new Response(`{"error": "POST method supported"}`, {status: 405})
  }
  let body = await context.request.text()
  
  try {
    body = JSON.parse(body)
  } catch (e) {
        return new Response(`{"error": "Malformed JSON"}`, {status: 500})
  }
  
  return new Response(JSON.stringify(removeEmptyValues(body), null, 4))
}

function removeEmptyValues(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => removeEmptyValues(item));
  }

  if (typeof obj === 'object' && obj !== null) {
    const newObj = {};

    for (const key in obj) {
      const value = removeEmptyValues(obj[key]);

      if (!value) {
        continue
      }

      if (typeof value === 'object' && Object.keys(value).length === 0) {
        continue; // Skip empty objects
      }

      newObj[key] = value;
    }

    return newObj;
  }

  return obj;
}
