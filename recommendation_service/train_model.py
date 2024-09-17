import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

# Load processed data
def load_processed_data(filepath):
    return pd.read_csv(filepath)

# Train a recommendation model
def train_model(df):
    # Initialize LabelEncoder
    label_encoder = LabelEncoder()

    # Encode categorical features
    df['Gender'] = label_encoder.fit_transform(df['Gender'])
    df['Item Purchased'] = label_encoder.fit_transform(df['Item Purchased'])  # Assuming this is the target

    # Feature selection
    X = df[['Gender', 'Age']]
    y = df['Purchase Amount (USD)']  # Adjust this if needed

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Model initialization (Using RandomForestRegressor as an example)
    model = RandomForestRegressor(n_estimators=100, random_state=42)

    # Model training
    model.fit(X_train, y_train)

    # Predict on test data
    y_pred = model.predict(X_test)

    # Evaluate the model
    mse = mean_squared_error(y_test, y_pred)
    print(f"Model Mean Squared Error: {mse}")

    return model, label_encoder

if __name__ == "__main__":
    # Load and preprocess the data
    data = load_processed_data('data/shopping_trends.csv')

    # Train the model
    model, label_encoder = train_model(data)

    # Save the trained model and encoder for future use
    with open('models/recommendation_model.pkl', 'wb') as file:
        pickle.dump(model, file)
    with open('models/label_encoder.pkl', 'wb') as file:
        pickle.dump(label_encoder, file)

    print("Model training complete. Trained model and encoder saved.")
