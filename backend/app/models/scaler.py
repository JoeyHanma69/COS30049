from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib

# Load the dataset
df = pd.read_csv("backend/app/ML/cleaned_dataset.csv")

# Select features to fit the scaler
X = df[['Year', 'Month', 'Day', 'Period over which rainfall was measured (days)']]

# Fit the StandardScaler
scaler = StandardScaler()
scaler.fit(X)

# Save the scaler for later use in both training and prediction
joblib.dump(scaler, 'scaler.pkl')
