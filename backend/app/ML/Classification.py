import pandas as pd   
import os 
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split  
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, classification_report 
from sklearn.linear_model import LogisticRegression 
import warnings   

warnings.filterwarnings('ignore') 

# Load the dataset
df = pd.read_csv(r"C:\Users\cucum\Downloads\COS30049\assignment 2\cleaned_dataset.csv")  # Replace with the correct file path


df['Rainfall amount (millimetres)'].fillna(df['Rainfall amount (millimetres)'].median(), inplace=True)
df['Period over which rainfall was measured (days)'].fillna(df['Period over which rainfall was measured (days)'].median(), inplace=True)

# Feature selection (Using Year, Month, Day, Rainfall amount, and Period as features)
X = df[['Year', 'Month', 'Day', 'Rainfall amount (millimetres)', 'Period over which rainfall was measured (days)']]

# Target: Create a binary target based on rainfall amount (e.g., rain threshold of 1mm)
df['RainToday'] = df['Rainfall amount (millimetres)'].apply(lambda x: 1 if x >= 1 else 0)
y = df['RainToday']

# Step 3: Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the logistic regression model
model = LogisticRegression()
# Train the model
model.fit(X_train, y_train)
# Make predictions on the test set
y_pred = model.predict(X_test)
# Evaluate the model
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")

tree_model = DecisionTreeClassifier()
tree_model.fit(X_train, y_train)
tree_pred = tree_model.predict(X_test)
print("Decision Tree Accuracy:", accuracy_score(y_test, tree_pred))

# Random Forest Classifier
rf_model = RandomForestClassifier()
rf_model.fit(X_train, y_train)
rf_pred = rf_model.predict(X_test)
print("Random Forest Accuracy:", accuracy_score(y_test, rf_pred))

# K-Nearest Neighbors Classifier
knn_model = KNeighborsClassifier()
knn_model.fit(X_train, y_train)
knn_pred = knn_model.predict(X_test)
print("K-Nearest Neighbors Accuracy:", accuracy_score(y_test, knn_pred)) 
 
# Classification Report 
print("Classification Report:")
print(classification_report(y_test, y_pred)) 

model_dir = os.path.dirname(__file__) 

model_path = os.path.join(model_dir, "classification_model.pkl")
with open(model_path, "wb") as f:
    pickle.dump(model, f)

print(f"Classification model saved to {model_path}")
