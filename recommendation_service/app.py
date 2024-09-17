from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database']
products_collection = db['products']

# Load the trained model
with open('models/recommendation_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the product encoder
with open('models/label_encoder.pkl', 'rb') as file:
    product_encoder = pickle.load(file)

class UserInput(BaseModel):
    age: int
    gender: str

@app.get("/products/")
async def get_products():
    # Fetch products from MongoDB
    products = list(products_collection.find({}, {'_id': 0}))  # Exclude the MongoDB ID
    return {"products": products}

@app.post("/suggest-products/")
async def suggest_products(user_input: UserInput):
    # Encode the user input
    gender_encoded = 1 if user_input.gender.lower() == 'female' else 0
    
    # Create a DataFrame for prediction
    user_df = pd.DataFrame({
        'Gender': [gender_encoded],
        'Age': [user_input.age]
    })

    # Predict product suggestions (Here, we'll just simulate this)
    # In a real scenario, you'd use the model to get recommendations
    suggested_products = products_collection.find({})  # Fetch all products

    return {"suggested_products": list(suggested_products)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
