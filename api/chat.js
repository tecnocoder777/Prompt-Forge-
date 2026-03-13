export default async function handler(req, res) {

  const prompt = req.query.q || "Hello";

  try {

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.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}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2-instruct-0905",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await r.json();

    res.status(200).json({
      answer: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
