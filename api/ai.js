const sessions = {};

export default async function handler(req, res) {

const q = req.query.q;
const key = req.query.key;
const sid = req.query.sid || "default";
const ci = req.query.ci || "You are a helpful AI assistant.";

if(!q || !key){
res.status(400).send("Missing q or key");
return;
}

if(!sessions[sid]){
sessions[sid] = [
{role:"system",content:ci}
];
}

sessions[sid].push({
role:"user",
content:q
});

try{

const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+key
},
body:JSON.stringify({
model:"moonshotai/kimi-k2-instruct-0905",
messages:sessions[sid]
})
});

const data = await r.json();

const reply = data?.choices?.[0]?.message?.content || "No response";

sessions[sid].push({
role:"assistant",
content:reply
});

res.setHeader("Content-Type","text/plain");

res.send(reply);

}catch(e){

res.status(500).send(e.toString());

}

}
