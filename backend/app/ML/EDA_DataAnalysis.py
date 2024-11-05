import pandas as pd 
import warnings 
import seaborn as sns 
import matplotlib.pyplot as plt 
import numpy as np  


df = pd.read_csv(r"C:\Users\cucum\Downloads\COS30049\assignment 2\cleaned_dataset.csv")  # Replace with your file path
 
warnings.filterwarnings('ignore')  

# Boxplot of Rainfall amount by month
plt.figure(figsize=(10, 6))
sns.boxplot(x='Month', y='Rainfall amount (millimetres)', data=df)
plt.title('Rainfall Amount Distribution by Month')
plt.xlabel('Month')
plt.ylabel('Rainfall (mm)')
plt.show() 

# Boxplot of Rainfall Amount by Period of Measurement 
plt.figure(figsize=(10, 6)) 
sns.boxplot(x='Period over which rainfall was measured (days)', y='Rainfall amount (millimetres)', data=df) 
plt.title('Rainfall Amount vs Period of Measurement')
plt.xlabel('Period')
plt.ylabel('Rainfall (mm)')
plt.show()  
  
# Scatter plot of Rainfall vs Period
plt.figure(figsize=(10, 6))
sns.scatterplot(x='Period over which rainfall was measured (days)', y='Rainfall amount (millimetres)', data=df)
plt.title('Rainfall Amount vs Period of Measurement')
plt.xlabel('Period (days)')
plt.ylabel('Rainfall (mm)')
plt.show()

 

# Pairwise Relationships 
numerical_columns = df.select_dtypes(include=[np.number]).columns
sns.pairplot(df[numerical_columns])
plt.suptitle('Pairwise Relationships of Numerical Features', y=1.02)
plt.show()


# Correlation Matrix 
plt.figure(figsize=(12, 8)) 
correlation_matrix = df[numerical_columns].corr() 
sns.heatmap(correlation_matrix, annot=True, fmt=".2f", cmap="coolwarm", cbar=True,  
            vmin=-1, vmax=1, center=0, linewidths=0.5, linecolor='black') 
plt.title('Correlation Matrix of Numerical Features', size=16) 
plt.xticks(rotation=45) 
plt.yticks(rotation=0) 
plt.show() 

# Missing Data Analysis 
missing_data = df.isnull().sum().sort_values(ascending=False) 
missing_percentage = (df.isnull().sum() / len(df) * 100).sort_values(ascending=False) 

missing_df = pd.DataFrame({'Missing Values' : missing_data, 'Percentage': missing_percentage}) 
missing_df = missing_df[missing_df['Missing Values'] > 0] 

print("Missing Values Overview") 
print(missing_df) 

plt.figure(figsize=(12, 6)) 
sns.barplot(x=missing_df.index, y="Percentage", data=missing_df) 
plt.xticks(rotation=90) 
plt.title('Missing Data Percentage per Feature') 
plt.show() 

# Outliers Summary (Optional) 
def count_outliers(df, column): 
    Q1 = df[column].quantile(0.25) 
    Q3 = df[column].quantile(0.75) 
    IQR = Q3 - Q1 
    lower_bound = Q1 - 1.5 * IQR 
    upper_bound = Q3 + 1.5 * IQR 
    return ((df[column] < lower_bound) | (df[column] > upper_bound)).sum() 

outliers_summary = pd.DataFrame({ 
        'Feature' : numerical_columns, 
        'Outliers' : [count_outliers(df, col) for col in numerical_columns]                         
}) 

print("\nOutliers Summary:") 
print(outliers_summary) 


