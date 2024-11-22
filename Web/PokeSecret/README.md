# PokeSecret

### Difficulty
easy

### Challenge Description

Woah! This site helps you choose random Pokémon characters, but can you crack the secret?

### Short Writeup

In this challenge, we observe that we can modify the Pokemon characters. When we visit the secret endpoint, it displays "You are not Pikachu." Upon inspecting the cookie, we notice that it is set to the corresponding Pokémon name.

Changing the Pokémon name to Pikachu will provide us with the flag.

### Flag

Flag:inctfj{P1K4CHU_11K35_C00K135}

### Author

**h3r10s**