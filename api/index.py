from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
# from api.generation import generate, complete

app = FastAPI()

class GenerateRequest(BaseModel):
    topic: str
    length: str
    temperature: float = 0.7
    genre: Optional[str] = None
    narrative_perspective: Optional[str] = None
    character_name: Optional[str] = None
    character_description: Optional[str] = None
    setting_description: Optional[str] = None

@app.post("/api/generate")
def generate_story(request: GenerateRequest):
    response = generate(
        topic=request.topic,
        length=request.length,
        temperature=request.temperature,
        genre=request.genre,
        narrative_perspective=request.narrative_perspective,
        character_name=request.character_name,
        character_description=request.character_description,
        setting_description=request.setting_description
    )
    return {"story": response}

@app.get("/api/generates")
def generate_story():
    response = "One Upon a time there was a man"
    return {"story": response}
