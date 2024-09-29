from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# Load drug information from drug_info_A.py
def load_drug_info(file_name):
    drug_info = {}
    with open(file_name, 'r') as f:
        exec(f.read(), drug_info)
    return drug_info['drug_info_A']

# Function to find the second occurrence of a substring in a string
def find_second_occurrence(text, substring):
    first_occurrence = text.lower().find(substring)
    if first_occurrence == -1:
        return -1
    return text.lower().find(substring, first_occurrence + 1)

# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--ignore-ssl-errors')

# Initialize WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# Load drug info
drug_info_A = load_drug_info('drug_info_A.py')

# Open output file
with open('all_drug_uses.txt', 'w', encoding='utf-8') as output_file:
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

        # Find the second occurrence of "why is this medication prescribed?"
        start_index = find_second_occurrence(page_content, "why is this medication prescribed?")
        end_index = find_second_occurrence(page_content, "how should this medicine be used?")

        if start_index != -1 and end_index != -1:
            # Extract drug uses text
            drug_uses = page_content[start_index + len("why is this medication prescribed?"):end_index].strip()
            drug_uses = ' '.join(drug_uses.split())  # Normalize whitespace

            # Format the output as desired
            output_file.write(f"{drug_name}:\nUses: {drug_uses}\n\n")
            print(f"Successfully extracted uses for: {drug_name}")
        else:
            print(f"Could not find uses for: {drug_name}")

# Close the browser
driver.quit()
