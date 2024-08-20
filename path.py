from fastapi import FastAPI, File, UploadFile
from typing import Dict
import uvicorn
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/images", StaticFiles(directory="images"), name="images")

UPLOAD_DIR = "images"

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@app.post("/upload_image")
async def upload_image(image: UploadFile = File(...)):
    file_location = os.path.join(UPLOAD_DIR, image.filename)
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(image.file, file_object)

    image_url = f"http://127.0.0.1:4000/images/{image.filename}"  # Ensure this matches the URL used to serve static files
    
    result = {
        "imageUrl": image_url,
        "totalImages": 10,
        "damagedImages": 2
    }
    return result

if __name__ == '__main__':
    uvicorn.run("path:app", host='127.0.0.1', port=4000)
