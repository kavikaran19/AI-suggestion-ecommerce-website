import pickle
import pandas as pd

# Load the trained model
def load_model(filepath):
    with open(filepath, 'rb') as file:
        model = pickle.load(file)
    return model

# Predict product recommendations
def recommend_products(model, gender, age_group):
    # Create a DataFrame for input features
    input_data = pd.DataFrame({'Gender': [gender], 'AgeGroup': [age_group]})

    # Predict purchase amount or scores (you may need to adjust based on your model)
    prediction = model.predict(input_data)

    return prediction

if __name__ == "__main__":
    # Load the trained model
    model = load_model('models/recommendation_model.pkl')

    # Example user input (Gender: 0 for Male, 1 for Female; AgeGroup: use appropriate encoded values)
    gender = 0  # Male
    age_group = 2  # Example AgeGroup encoding

    # Get recommendations
    recommendation = recommend_products(model, gender, age_group)
    print(f"Recommended product scores: {recommendation}")
