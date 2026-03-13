export default async function handler(req, res) {

  const prompt = req.query.q || "Hello";

  try {

    const response = await fetch("https://api.groq.com/openai/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.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}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2-instruct-0905",
        input: prompt
      })
    });

    const data = await response.json();

    res.status(200).json({
      answer: data.output_text || data.output?.[0]?.content?.[0]?.text || "No response"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }

}
