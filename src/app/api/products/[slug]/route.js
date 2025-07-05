export async function GET(
  request,
  { params } 
) {
  try {
    const { slug } = params;

    if (!slug) {
      return Response.json(
        { message: "Product slug is required" },
        { status: 400 }
      );
    }

    const externalUrl =`http://157.230.240.97:9999/api/v1/product/${slug}`;

    const res = await fetch(externalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response:", res);

    if (!res.ok) {
      if (res.status === 404) {
        return Response.json({ message: "Product not found" }, { status: 404 });
      }
      throw new Error(`External API error: ${res.statusText}`);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("API fetch error:", error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}