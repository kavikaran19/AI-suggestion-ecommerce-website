
from fastapi import FastAPI
# from fastapi import FastAPI, Depends
from pydantic import BaseModel
import pickle
import pandas as pd
from pymongo import MongoClient
import logging
import os
import certifi
from fastapi.middleware.cors import CORSMiddleware



# Set up logging for better debugging
logging.basicConfig(level=logging.INFO)

app = FastAPI()

# Allow all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Connect to MongoDB
try:
    # Use an environment variable for the MongoDB connection string
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb+srv://kavikaran19v:1055@cluster0.feyebem.mongodb.net/test?retryWrites=true&w=majority")
    # client = MongoClient(mongodb_uri)
    client = MongoClient(mongodb_uri, tlsCAFile=certifi.where())
    db = client['test']  # Replace with your actual database name
    products_collection = db['products']
    logging.info("MongoDB connection successful.")

    # Fetch and print all products from the collection on startup
    products = list(products_collection.find({}, {'_id': 0}))  # Exclude MongoDB ID
    if products:
        logging.info(f"Fetched {len(products)} products from MongoDB on startup.")
        print("Products Data from MongoDB on Startup:", products)
    else:
        logging.warning("No products found in the MongoDB collection.")
except Exception as e:
    logging.error(f"MongoDB connection failed: {e}")

# Load the trained model
try:
    with open('models/recommendation_model.pkl', 'rb') as file:
        model = pickle.load(file)
    logging.info("Model loaded successfully.")
except FileNotFoundError:
    logging.error("Recommendation model not found.")
except Exception as e:
    logging.error(f"Error loading model: {e}")

# Load the product encoder
try:
    with open('models/label_encoder.pkl', 'rb') as file:
        product_encoder = pickle.load(file)
    logging.info("Product encoder loaded successfully.")
except FileNotFoundError:
    logging.error("Product encoder not found.")
except Exception as e:
    logging.error(f"Error loading product encoder: {e}")

class UserInput(BaseModel):
    age: int
    gender: str

@app.get("/products/")
async def get_products():
    try:
        products = list(products_collection.find({}, {'_id': 0}))
        logging.info(f"Fetched {len(products)} products from MongoDB.")
        print("Fetched Products from MongoDB:", products)
        return {"products": products}
    except Exception as e:
        logging.error(f"Failed to fetch products: {e}")
        return {"error": "Failed to fetch products"}

#-----------------------------all product filter 
# Helper function to convert MongoDB document
# from bson import ObjectId

# # Helper function to convert MongoDB document to JSON-serializable format
# def convert_objectid_to_str(product):
#     if isinstance(product, dict):
#         for key, value in product.items():
#             if isinstance(value, ObjectId):
#                 product[key] = str(value)  # Convert ObjectId to string
#             elif isinstance(value, list):
#                 product[key] = [convert_objectid_to_str(v) for v in value]  # Recursively convert in lists
#     return product

# @app.post("/suggest-products/")
# async def suggest_products(user_input: UserInput):
#     try:
#         logging.info(f"User input received: age={user_input.age}, gender={user_input.gender}")

#         all_products = pd.DataFrame(list(products_collection.find()))  # Load all products including _id

#         logging.info(f"All products loaded: {all_products.head()}")
#         logging.info(f"Column names: {all_products.columns.tolist()}")

#         # Convert to a list of dictionaries
#         suggested_products = [convert_objectid_to_str(product) for product in all_products.to_dict(orient='records')]

#         return {"suggested_products": suggested_products}
#     except Exception as e:
#         logging.error(f"Failed to suggest products: {e}")
#         return {"error": "Failed to suggest products"}

#-------------------------------suggestion products
from bson import ObjectId

# Helper function to convert MongoDB document to JSON-serializable format
def convert_objectid_to_str(product):
    if isinstance(product, dict):
        for key, value in product.items():
            if isinstance(value, ObjectId):
                product[key] = str(value)  # Convert ObjectId to string
            elif isinstance(value, list):
                product[key] = [convert_objectid_to_str(v) for v in value]  # Recursively convert in lists
    return product

@app.post("/suggest-products/")
async def suggest_products(user_input: UserInput):
    try:
        logging.info(f"User input received: age={user_input.age}, gender={user_input.gender}")

        # Load all products including _id
        all_products = pd.DataFrame(list(products_collection.find()))

        logging.info(f"All products loaded: {all_products.head()}")
        logging.info(f"Column names: {all_products.columns.tolist()}")

        # Limit the results to 5 products
        limited_products = all_products.head(5)  # Select the first 5 products

        # Convert to a list of dictionaries
        suggested_products = [convert_objectid_to_str(product) for product in limited_products.to_dict(orient='records')]

        return {"suggested_products": suggested_products}
    
    except Exception as e:
        logging.error(f"Failed to suggest products: {e}")
        return {"error": "Failed to suggest products"}


#---------------------------------------------

# Assuming you have a LabelEncoder for Gender
# Define feature names based on your model training
# feature_names = ['Gender', 'Age']  # Adjust according to your model's actual features

# A function to create the LabelEncoder
# def get_gender_encoder():
#     # Create and fit the encoder here
#     gender_encoder = LabelEncoder()
#     gender_encoder.fit(['Male', 'Female'])  # Fit with actual categories used during training
#     return gender_encoder


# @app.post("/suggest-products/")
# async def suggest_products(user_input: UserInput, gender_encoder: LabelEncoder = Depends(get_gender_encoder)):
#     try:
#         logging.info(f"User input received: age={user_input.age}, gender={user_input.gender}")

#         # Load all products
#         all_products = pd.DataFrame(list(products_collection.find()))
#         logging.info(f"All products loaded: {all_products.head()}")

#         # Check if the model is available
#         if model is None:
#             logging.error("Recommendation model is not loaded.")
#             return {"error": "Model not loaded."}

#         # Prepare input data for the model
#         input_data = pd.DataFrame({
#             'Gender': [user_input.gender],
#             'Age': [user_input.age]
#         })

#         # Encode the gender
#         input_data['Gender'] = gender_encoder.transform(input_data['Gender'])

#         # Ensure input_data matches the order of feature_names
#         input_data = input_data[feature_names]

#         # Log input data
#         logging.info(f"Input data for prediction:\n{input_data}")

#         # Make predictions
#         predictions = model.predict(input_data)
#         logging.info(f"Model predictions: {predictions}")

#         # Filter products based on model predictions
#         suggested_product_ids = predictions.tolist()
#         filtered_products = all_products[all_products['_id'].isin(suggested_product_ids)]

#         if filtered_products.empty:
#             logging.warning("No products found for the given user input.")
#             return {"suggested_products": []}

#         # Convert filtered products to a list of dictionaries
#         suggested_products = [convert_objectid_to_str(product) for product in filtered_products.to_dict(orient='records')]

#         logging.info(f"Suggested products: {suggested_products}")

#         return {"suggested_products": suggested_products}

#     except Exception as e:
#         logging.error(f"Failed to suggest products: {e}", exc_info=True)
#         return {"error": "Failed to suggest products"}



if __name__ == "__main__":
    import uvicorn
    logging.info("Starting FastAPI application...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
