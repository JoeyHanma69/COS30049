import pandas as pd
import warnings

# Suppress warnings
warnings.filterwarnings('ignore')

# Static file path for Rainfall_in_MOP.csv
FILE_PATH = 'Rainfall_in_MOP.csv'  # Make sure this file is in the same directory as the script

# Function to load data
def load_data(file_path):
    """Load data from a CSV file."""
    try:
        df = pd.read_csv(file_path)
        print("Data loaded successfully. First 5 rows of the dataset:")
        print(df.head())
        return df
    except FileNotFoundError:
        print(f"Error: The file at {file_path} was not found.")
        return None
    except pd.errors.EmptyDataError:
        print("Error: The file is empty.")
        return None
    except pd.errors.ParserError:
        print("Error: There was a problem parsing the file.")
        return None

# Function to remove duplicates
def remove_duplicates(df):
    """Remove duplicate rows from the DataFrame."""
    if df is not None:
        num_duplicates = df.duplicated().sum()
        print(f"Number of duplicate rows: {num_duplicates}")
        if num_duplicates > 0:
            df = df.drop_duplicates()
            print("Duplicates removed.")
    else:
        print("Error: DataFrame is None.")
    return df

# Function to handle missing values for numerical columns
def impute_numerical(df):
    """Impute missing values for numerical columns."""
    if df is not None:
        numerical_cols = df.select_dtypes(include=['float64', 'int64']).columns
        for col in numerical_cols:
            if df[col].isnull().sum() > 0:
                print(f"Imputing missing values for numerical column: {col}")
                df[col].fillna(df[col].median(), inplace=True)  # Using median to handle missing data
    else:
        print("Error: DataFrame is None.")
    return df

# Function to handle missing values for categorical columns
def impute_categorical(df):
    """Impute missing values for categorical columns."""
    if df is not None:
        categorical_cols = df.select_dtypes(include=['object']).columns
        for col in categorical_cols:
            if df[col].isnull().sum() > 0:
                print(f"Imputing missing values for categorical column: {col}")
                df[col].fillna(df[col].mode()[0], inplace=True)  # Using mode to handle missing data
    else:
        print("Error: DataFrame is None.")
    return df

# Function to drop columns with too many missing values (optional)
def drop_unnecessary_columns(df, threshold=0.5):
    """Drop columns with more than a given threshold of missing values."""
    if df is not None:
        missing_ratio = df.isnull().sum() / len(df)
        columns_to_drop = missing_ratio[missing_ratio > threshold].index
        if len(columns_to_drop) > 0:
            print(f"Dropping columns with more than {threshold * 100}% missing values: {list(columns_to_drop)}")
            df.drop(columns_to_drop, axis=1, inplace=True)
    else:
        print("Error: DataFrame is None.")
    return df

# Main processing function
def process_data():
    """Main function to process the data from Rainfall_in_MOP.csv."""
    df = load_data(FILE_PATH)
    if df is None:
        print("Error: Data loading failed. Exiting process.")
        return None
    
    df = remove_duplicates(df)
    df = impute_numerical(df)
    df = impute_categorical(df)
    df = drop_unnecessary_columns(df)
    
    # Check the updated missing values
    print("\nMissing values after processing:")
    print(df.isnull().sum())  
     
    # Saves the cleaned dataset as 'cleaned_dataset.csv
    cleaned_file_path = 'cleaned_dataset.csv' 
    df.to_csv(cleaned_file_path, index=False) 
    print(f"\nDataset process as {cleaned_file_path}")
    
    return df

# Entry point for the script
if __name__ == "__main__":
    processed_data = process_data()
    if processed_data is not None:
        print("\nData processing complete.")
    else:
        print("Data processing failed.")

