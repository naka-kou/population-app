export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prefCode = searchParams.get("prefCode");

  if (!prefCode) {
    return Response.json({ message: "prefCode is required" }, { status: 400 });
  }

  const code = Number(prefCode);

  return Response.json({
    result: {
      data: [
        {
          label: "総人口",
          data: [
            { year: 2000, value: 1000000 + code * 1000 },
            { year: 2005, value: 1100000 + code * 1000 },
            { year: 2010, value: 1200000 + code * 1000 },
            { year: 2015, value: 1300000 + code * 1000 },
          ],
        },
        {
          label: "年少人口",
          data: [
            { year: 2000, value: 200000 + code * 500 },
            { year: 2005, value: 180000 + code * 500 },
            { year: 2010, value: 160000 + code * 500 },
            { year: 2015, value: 140000 + code * 500 },
          ],
        },
        {
          label: "生産年齢人口",
          data: [
            { year: 2000, value: 600000 + code * 800 },
            { year: 2005, value: 650000 + code * 800 },
            { year: 2010, value: 700000 + code * 800 },
            { year: 2015, value: 750000 + code * 800 },
          ],
        },
        {
          label: "老年人口",
          data: [
            { year: 2000, value: 200000 + code * 300 },
            { year: 2005, value: 250000 + code * 300 },
            { year: 2010, value: 300000 + code * 300 },
            { year: 2015, value: 350000 + code * 300 },
          ],
        },
      ],
    },
  });
}
