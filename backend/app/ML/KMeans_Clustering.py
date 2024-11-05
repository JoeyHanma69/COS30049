import pickle 
import os
import pandas as pd  
import matplotlib.pyplot as plt 
import seaborn as sns 
from sklearn.cluster import KMeans
import warnings  

warnings.filterwarnings('ignore')  

df = pd.read_csv(r"C:\Users\cucum\Downloads\COS30049\assignment 2\cleaned_dataset.csv")
 
X = df.loc[:, ["Rainfall amount (millimetres)", "Period over which rainfall was measured (days)"]]   
X.fillna(X.median(), inplace=True)

model = KMeans(n_clusters=5, random_state=5)
model.fit(X)

all_predictions = model.predict(X)

plt.figure(figsize=(12, 6))
plt.scatter(X["Rainfall amount (millimetres)"], X["Period over which rainfall was measured (days)"], c=all_predictions, cmap='viridis')
plt.title('Cluster of Weather Test Data')
plt.xlabel('Rainfall amount (millimetres')
plt.ylabel('Period over which rainfall was measured (days)')
plt.colorbar(label='Cluster')
plt.show() 


model_dir = os.path.dirname(__file__)

model_path = os.path.join(model_dir, 'kmeans_model.pkl') 
with open(model_path, 'wb') as f:  
    pickle.dump(model, f) 
    
print(f"Kmeans saved to {model_path}")
