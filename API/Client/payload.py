import requests
import json


import base64

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode("utf-8")
    return encoded_string



# Your Base64 encoded image string
base64_string = encode_image_to_base64("hoodie.png")

# Construct the JSON payload in the required format
inner_json = json.dumps({"image_data": base64_string})  # Inner JSON as string
payload = {"body": inner_json}  # Outer JSON wrapping the inner string

# Define your API URL
url = "http://192.168.119.1:8000/validate_body"

# Make the POST request
response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})

# Print response
print(response.json())  # Or response.text if not JSON
