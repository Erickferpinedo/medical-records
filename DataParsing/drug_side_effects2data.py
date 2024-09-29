import re

def parse_side_effects_to_dict(file_path):
    # Initialize an empty dictionary to store the data
    drug_dict = {}

    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex pattern to capture medication name and its side effects
    pattern = r'(?P<drug_name>[\w\s]+):\nThe side effects can be:\n(?P<side_effects>.+?)(?=\n\n|$)'

    # Find all matches for the pattern
    matches = re.finditer(pattern, content, re.DOTALL)

    # Iterate over the matches and add them to the dictionary
    for match in matches:
        drug_name = match.group('drug_name').strip()  # Clean up the drug name
        side_effects = match.group('side_effects').strip()  # Clean up the side effects

        # Remove lines that contain unwanted words
        side_effects = re.sub(r'^.*these symptoms.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*doctor.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*what.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*why.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*healthcare.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*you.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*should.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*side effects.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*side effects=.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()
        side_effects = re.sub(r'^.*side effects.*$', '', side_effects, flags=re.IGNORECASE | re.MULTILINE).strip()

        # Remove newlines and replace them with commas to form a single line
        side_effects = re.sub(r'\n+', ', ', side_effects).strip()

        # Create a list by splitting on commas
        side_effects_list = [effect.strip() for effect in side_effects.split(',') if effect.strip()]

        # If only one valid side effect is found, set it to an empty list
        if len(side_effects_list) == 1:
            side_effects_list = []
        
        # If no side effects are found, also set to an empty list
        if not side_effects_list:
            side_effects_list = []

        # Store in the dictionary
        drug_dict[drug_name] = side_effects_list

    return drug_dict

def write_dict_as_code_to_file(drug_dict, output_file):
    # Write the dictionary into a txt file in Python dict format
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("dict = {\n")
        for drug, side_effects in drug_dict.items():
            f.write(f"    '{drug}': {side_effects},\n")
        f.write("}\n")

# Specify the path to the input and output files
input_file = 'all_drug_side_effects.txt'
output_file = 'side_effects_dict_as_code.txt'

# Parse the side effects into a dictionary
drug_side_effects_dict = parse_side_effects_to_dict(input_file)

# Write the dictionary data in Python code format to a file
write_dict_as_code_to_file(drug_side_effects_dict, output_file)

# Print out the result for debugging
print(drug_side_effects_dict)
