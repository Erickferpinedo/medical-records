import re

def parse_uses_to_dict(file_path):
    # Initialize an empty dictionary to store the data
    drug_dict = {}

    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex pattern to capture medication name and its uses
    pattern = r'(?P<drug_name>[\w\s]+):\nUses:\s*(?P<uses>.+?)(?=\n\n|$)'

    # Find all matches for the pattern
    matches = re.finditer(pattern, content, re.DOTALL)

    # Iterate over the matches and add them to the dictionary
    for match in matches:
        drug_name = match.group('drug_name').strip()  # Clean up the drug name
        uses = match.group('uses').strip()  # Clean up the uses)

        # Remove newlines and replace them with commas to form a single line
        uses = re.sub(r'\n+', ', ', uses).strip()

        # Create a list by splitting on commas
        uses_list = [use.strip() for use in uses.split(',') if use.strip()]

        # If no uses are found, also set to an empty list
        if not uses_list:
            uses_list = []

        # Store in the dictionary
        drug_dict[drug_name] = uses_list

    return drug_dict

def write_dict_as_code_to_file(drug_dict, output_file):
    # Write the dictionary into a txt file in Python dict format
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("drug_uses_dict = {\n")
        for drug, uses in drug_dict.items():
            f.write(f"    '{drug}': {uses},\n")
        f.write("}\n")

# Specify the path to the input and output files
input_file = 'all_drug_uses.txt'
output_file = 'drug_uses_dict_as_code.txt'

# Parse the uses into a dictionary
drug_uses_dict = parse_uses_to_dict(input_file)

# Write the dictionary data in Python code format to a file
write_dict_as_code_to_file(drug_uses_dict, output_file)

# Print out the result for debugging
print(drug_uses_dict)
