exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const makanan = body.makanan;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `
Kembalikan HANYA JSON valid.

Format:
{
  "nama":"",
  "bahan":[
    {
      "nama":"",
      "merk":""
    }
  ],
  "cara":[]
}
`,
            },
            {
              role: "user",
              content: `Buat resep ${makanan}`,
            },
          ],
          temperature: 0.3,
        }),
      }
    );

    const openaiData = await response.json();

    if (!response.ok) {
      return {
        statusCode: 500,
        body: JSON.stringify(openaiData),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: openaiData.choices[0].message.content,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};