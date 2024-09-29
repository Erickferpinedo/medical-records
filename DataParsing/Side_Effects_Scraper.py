from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# Load drug information from drug_info_A.py
def load_drug_info(file_name):
    # Create a dictionary to execute the file's content into
    drug_info = {}
    with open(file_name, 'r') as f:
        exec(f.read(), drug_info)  # Execute the file's code in the dictionary
    return drug_info['drug_info_A']  # Return the list of drug info

# Set up Chrome options to ignore SSL errors
chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--ignore-ssl-errors')

# Initialize WebDriver with options
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# Load drug info
drug_info_A = load_drug_info('drug_info_A.py')

# Open output file
with open('all_drug_side_effects.txt', 'w', encoding='utf-8') as output_file:
    for entry in drug_info_A:
        # Split drug name and link
        parts = entry.split(', Link: ')
        drug_name = parts[0].split(': ')[1]  # Extract drug name
        drug_link = parts[1]  # Extract link

        # Open the drug page
        print(f"Opening link for: {drug_name}")
        driver.get(drug_link)
        time.sleep(5)  # Wait for the page to load

        # Extract all text from the page
        page_content = driver.find_element("tag name", "body").text

        # Find the section for side effects
        start_index = page_content.find("these symptoms")
        end_index = page_content.find("Call your doctor")

        if start_index != -1 and end_index != -1:
            # Extract side effects text
            side_effects = page_content[start_index:end_index].strip()
            # Write drug name and side effects to the output file
            output_file.write(f"{drug_name}:\n")
            output_file.write(f"The side effects can be:\n{side_effects}\n\n")
            print(f"Successfully extracted side effects for: {drug_name}")
        else:
            print(f"Could not find side effects for: {drug_name}")

# Close the browser
driver.quit()
