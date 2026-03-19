export default async function handler(req, res) {

  const q = req.query.q;
  const key = req.query.key;

  if (!q || !key) {
    return res.status(400).send("Missing q or key");
  }

  try {

    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // 👈 change model
        messages: [
          { role: "user", content: q }
        ]
      })
    });

    const data = await r.json();

    // 👇 debug full response
    if (!data.choices) {
      return res.send(JSON.stringify(data));
    }

    const reply = data.choices[0].message.content;

    res.setHeader("Content-Type", "text/plain");
    res.send(reply);

  } catch (e) {
    res.status(500).send(e.toString());
  }

}
