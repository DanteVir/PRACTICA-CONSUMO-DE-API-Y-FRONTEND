from fastapi import FastAPI
from pydantic import BaseModel
from openai import OpenAI

app = FastAPI()

client = OpenAI(
    api_key="TU_API_KEY_PERPLEXITY",
    base_url="https://api.perplexity.ai"
)

class ChatRequest(BaseModel):
    mensaje: str


@app.post("/chat")
def chat(req: ChatRequest):

    prompt = f"""
    Responde usando información de la página:
    https://avanzarsoluciones.com/

    Pregunta:
    {req.mensaje}
    """

    response = client.chat.completions.create(
        model="sonar-pro",  # puedes usar sonar o sonar-pro
        messages=[
            {"role": "system", "content": "Eres un asistente experto de Avanzar Soluciones."},
            {"role": "user", "content": prompt}
        ]
    )

    return {
        "respuesta": response.choices[0].message.content
    }