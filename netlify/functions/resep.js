exports.handler = async (event) => {

const body =
JSON.parse(event.body);

const makanan =
body.makanan;

const apiKey =
process.env.OPENAI_API_KEY;

const response =
await fetch(
"https://api.openai.com/v1/chat/completions",
{
method:"POST",
headers:{
"Authorization":
`Bearer ${apiKey}`,
"Content-Type":
"application/json"
},
body:JSON.stringify({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:`
Jawab hanya JSON.

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

Gunakan merek bahan yang umum di Indonesia bila relevan.
`
},
{
role:"user",
content:
`Buat resep ${makanan}`
}
]
})
}
);

const data =
await response.json();

return{
statusCode:200,
body:data.choices[0]
.message.content
};

};