export async function GET() {
  const res = await fetch(
    "https://frontend-engineer-codecheck-api.mirai.yumemi.io/api/v1/prefectures",
    {
      headers: {
        "X-API-KEY": process.env.YUMEMI_API_KEY || "",
      },
    },
  );

  const data = await res.json();

  return Response.json(data);
}
