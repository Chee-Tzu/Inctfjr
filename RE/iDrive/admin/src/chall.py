import base64
import textwrap

a = {
    "a": "<<<", "b": "<<^", "c": "<<>", "d": "<^<", "e": "<^^", "f": "<^>", "g": "<><", "h": "<>^", 
    "i": "<>>", "j": "^<<", "k": "^<^", "l": "^<>", "m": "^^<", "n": "^^^", "o": "^^>", "p": "^><", 
    "q": "^>^", "r": "^>>", "s": "><<", "t": "><^", "u": ">><", "v": "><>", "w": ">^<", "x": ">^^", 
    "y": ">^>", "z": ">>>"
}

def b(data, n):
    for _ in range(n):
        data = base64.b64decode(data).decode('utf-8')
    return data

def main():
    rabbit = """ ⠀                          _____
   __           _       .-'|     |
  |  |``-.   ,a888a,   |   |     |
__|  |    |__8888888___|   |     |____
--|  |    |----/|\-----|   |     |----
--|  |    |---/ | \----|   |     |----
__|  |    |__/  |  \___|   |     |____
  |  |  .'  /   |   \  `.  |     |
__|__|.'___/____|____\___`.|_____|____

Set off on an exciting city quest, weaving through its maze of streets with ">" "<" and "^", all in a thrilling race to capture the elusive flag!\n"""
    word = input(rabbit).strip()
    if [ord(key) for chunk in textwrap.wrap(word, 3) for key, value in a.items() if value == chunk]==[106, 108, 111]: 
        with open("msg.txt", 'rb') as f:
            file_data = f.read()
        n = len(word)  
        part = b(file_data, n)
        print(f"You're an exceptional navigator! Here's your well-deserved flag: {part}")
    else:
        print("Try again")

if __name__ == "__main__":
    main()
