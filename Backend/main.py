from fastapi import FastAPI
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"mensaje": "API funcionando"}

client = OpenAI(api_key="sxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

URL = "https://avanzarsoluciones.com/"

def obtener_contenido():
    try:
        res = requests.get(URL)
        soup = BeautifulSoup(res.text, "html.parser")
        textos = soup.get_text(separator=" ", strip=True)
        return textos[:8000]
    except:
        return "No se pudo obtener la información del sitio."

contenido_web = obtener_contenido()

class Pregunta(BaseModel):
    pregunta: str


@app.post("/chat")
def chat(p: Pregunta):

    prompt = f"""
    Responde SOLO usando la información de esta empresa.

    INFORMACIÓN:
    {contenido_web}

    PREGUNTA:
    {p.pregunta}

    Si no sabes la respuesta, di:
    "Lo siento, solo puedo responder sobre Avanzar Soluciones."
    """

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt
    )

    return {"respuesta": response.output_text}