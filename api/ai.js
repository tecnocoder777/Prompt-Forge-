export default async function handler(req, res) {

  const q = req.query.q;
  const key = req.query.key;

  if (!q || !key) {
    res.status(400).send("Missing q or key");
    return;
  }

  try {

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2-instruct-0905",
        messages: [
          {
            role: "user",
            content: q
          }
        ]
      })
    });

    const data = await r.json();

    const reply = data?.choices?.[0]?.message?.content || "No response";

    res.setHeader("Content-Type", "text/plain");
    res.send(reply);

  } catch (e) {
    res.status(500).send(e.toString());
  }

}
