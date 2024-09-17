from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

# Load the trained model
with open('models/recommendation_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Load the product encoder
with open('models/label_encoder.pkl', 'rb') as file:
    product_encoder = pickle.load(file)

# Load the main product data
products_df = pd.read_csv('data/products.csv')  # Update with the path to your actual product data

class UserInput(BaseModel):
    age: int
    gender: str

@app.post("/suggest-products/")
async def suggest_products(user_input: UserInput):
    # Encode the user input
    gender_encoded = 1 if user_input.gender.lower() == 'female' else 0
    
    # Create a DataFrame for prediction
    user_df = pd.DataFrame({
        'Gender': [gender_encoded],
        'Age': [user_input.age]
    })

    # Predict the product ID (or scores) based on user input
    predicted_product_ids = model.predict(user_df)

    # Decode product IDs to names using the encoder
    predicted_product_ids = product_encoder.inverse_transform(predicted_product_ids.astype(int))

    # Retrieve product names from the main product DataFrame
    suggested_products = products_df[products_df['ProductID'].isin(predicted_product_ids)]['ProductName'].tolist()

    return {"suggested_products": suggested_products}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
