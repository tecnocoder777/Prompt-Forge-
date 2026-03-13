export default async function handler(req, res) {

const q = req.query.q;
const key = req.query.key;
const ci = req.query.ci || "You are a helpful AI assistant. Reply short and clear.";

if(!q){
res.status(400).send("No question");
return;
}

if(!key){
res.status(400).send("No API key");
return;
}

try{

const r = await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":"Bearer " + key
},
body:JSON.stringify({
model:"moonshotai/kimi-k2-instruct-0905",
messages:[
{role:"system",content:ci},
{role:"user",content:q}
]
})
});

const data = await r.json();

res.setHeader("Content-Type","text/plain");

res.send(
data?.choices?.[0]?.message?.content || "No response"
);

}catch(e){

res.status(500).send(e.toString());

}

}
