from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
import time
import os  # Import os to check file paths

# Set up Chrome options to ignore SSL errors
chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--ignore-ssl-errors')

# Initialize WebDriver with options
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# Open the MedlinePlus page
url = 'https://medlineplus.gov/druginfo/drug_Aa.html'
driver.get(url)

# Wait for the page to load (increase if needed)
time.sleep(5)

# Get and print the page title
title = driver.title
print(f"Page title: {title}")

# Prepare to collect drug information
drug_info_A = []  # Initialize the list

try:
    # Locate the "0-9" section or all available drugs on the page
    drugs_section = driver.find_elements(By.XPATH, "//ul/li/a")

    if not drugs_section:
        print("No drugs found on the page. Please check the structure.")
    else:
        print(f"Found {len(drugs_section)} drugs.")

        for drug in drugs_section:
            name = drug.text  # Get the text of the <a> tag
            link = drug.get_attribute('href')  # Get the URL from the href attribute
            
            # Filter out unwanted entries
            if name and link:
                formatted_info = f"Drug Name: {name}, Link: {link}"
                print(formatted_info)  # Print the drug info in the desired format
                drug_info_A.append(formatted_info)  # Append it to the list

except Exception as e:
    print(f"An error occurred while extracting drug info: {e}")

# Check if we have valid drug info to write
if drug_info_A:
    # Save the drug information to a new Python file
    try:
        output_file = 'drug_info_A.py'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("# Drug Information\n")
            f.write("drug_info_A = [\n")
            for info in drug_info_A:
                f.write(f"    '{info}',\n")  # Write in the desired format
            f.write("]\n")

        print(f"Drug information successfully written to {output_file}")

        # Confirm file creation
        if os.path.exists(output_file):
            print(f"{output_file} created successfully.")
        else:
            print(f"Failed to create {output_file}.")

    except IOError as io_err:
        print(f"IOError: {io_err}")
    except Exception as e:
        print(f"An unexpected error occurred while writing to the file: {e}")
else:
    print("No drug information to write.")

# Close the browser
driver.quit()
