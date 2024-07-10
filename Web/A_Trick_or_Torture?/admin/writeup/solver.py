import requests

url = "http://localhost:9021/"
last_response = None

while True:
    response = requests.get(url)
    if response.content != last_response:
        last_response = response.content
        decoded_response = ""
        for byte in last_response.decode().split():
            decoded_response += chr(int(byte, 2))
        print(decoded_response)
