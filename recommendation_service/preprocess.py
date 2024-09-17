import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load the dataset
def load_data(filepath):
    return pd.read_csv(filepath)

# Clean and preprocess the data
def preprocess_data(df):
    # Fill missing values if any
    df = df.dropna()

    # Encode categorical variables like gender
    label_encoder = LabelEncoder()
    df['Gender'] = label_encoder.fit_transform(df['Gender'])

    # Convert age to a categorical feature if necessary
    df['AgeGroup'] = pd.cut(df['Age'], bins=[0, 18, 25, 35, 45, 55, 65, 100], 
                            labels=['0-18', '19-25', '26-35', '36-45', '46-55', '56-65', '65+'])
    df['AgeGroup'] = label_encoder.fit_transform(df['AgeGroup'])

    # Remove unnecessary columns
    df = df[['Gender', 'AgeGroup', 'ProductID', 'PurchaseAmount']]

    return df, label_encoder

if __name__ == "__main__":
    # Load and preprocess the data
    data = load_data('data/shopping_trends.csv')
    processed_data, label_encoder = preprocess_data(data)
    # Save the processed data for future use
    processed_data.to_csv('data/processed_data.csv', index=False)
    print("Data preprocessing complete. Processed data saved to 'data/processed_data.csv'.")
