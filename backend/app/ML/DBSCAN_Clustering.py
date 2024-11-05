import os
import pickle
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
import warnings

warnings.filterwarnings('ignore')

# Load dataset
df = pd.read_csv(r"C:\Users\cucum\Downloads\COS30049\assignment 2\cleaned_dataset.csv")

# Clean column names to avoid whitespace issues
df.columns = df.columns.str.strip()

# Check if the required columns are available
required_columns = ['Year', 'Month', 'Day', 'Rainfall amount (millimetres)']
if all(column in df.columns for column in required_columns):
    # Use the available columns for clustering
    X = df[['Year', 'Month', 'Rainfall amount (millimetres)']]
else:
    print(f"Error: Required columns not found in the DataFrame. Available columns: {df.columns}")
    exit()

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train DBSCAN model
dbscan = DBSCAN(eps=0.3, min_samples=10)
dbscan.fit(X_scaled)

# Get the cluster labels
dbscan_labels = dbscan.labels_

# Plot the clusters (Year vs Rainfall Amount)
plt.figure(figsize=(12, 6))
plt.scatter(X['Year'], X['Rainfall amount (millimetres)'], c=dbscan_labels, cmap='viridis', s=50)
plt.title('DBSCAN Clustering')
plt.xlabel('Year')
plt.ylabel('Rainfall Amount (millimetres)')
plt.colorbar(label='Cluster')
plt.show()

# Save the trained DBSCAN model
model_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(model_dir, 'dbscan_model.pkl')

with open(model_path, 'wb') as f:
    pickle.dump(dbscan, f)

print(f"DBSCAN model saved to {model_path}")



