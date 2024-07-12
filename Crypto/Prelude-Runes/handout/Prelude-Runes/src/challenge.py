from os import system
import sys
from time import sleep
from icecream import ic

Flag= '{fake_flag_for_testing}'

def typewriter(words,delay):
    for char in words:
        sleep(delay)
        sys.stdout.write(char)
        sys.stdout.flush()

def header():
    
    typewriter("""\033[91m
 _                             ___
| |    __ _ _   _  ___ _ __   / _ \\ _ __   ___
| |   / _` | | | |/ _ \\ '__| | | | | '_ \\ / _ \\  _____
| |__| (_| | |_| |  __/ |    | |_| | | | |  __/ |_____|
|_____\\__,_|\\__, |\\___|_|     \\___/|_| |_|\\___|
            |___/
 ____           _           _
|  _ \\ _ __ ___| |_   _  __| | ___
| |_) | '__/ _ \\ | | | |/ _` |/ _ \\
|  __/| | |  __/ | |_| | (_| |  __/
|_|   |_|  \\___|_|\\__,_|\\__,_|\\___|


\033[0m\n""",0.005)
    
def round_commencer():
    symbol = "█"
    
    typewriter(f"\033[91m{symbol*70}\033[0m\n",0.05)
    
def v1speak(ciphertext):
    
    typewriter(f"""\n\033[96mBooting Sequence Initialised
Systems......online
Status: Recalibrating.............done.
Identity: V1
Location: Underworld
Goal: Break out of Underworld
Current Objective: Decode the cipher to break into the next layer
Analysis....done.
Given knowledge: "A Roman's secret language but Runified" ---> inctfj{"{ᛊᛚᛟᛈᛞ_ᚺᛏᚹᚹ_ᚹᛉᛞᛈ}"} \33[0m""",0.05)
    
def Encrypt(message):
    key=18
    message_list=[]

    for char in message:
        if char.isalpha():
            new_char=chr(ord('a')+(ord(char)+key) % 26)
            message_list.append(new_char)
        else:
            message_list.append(str(char))
    
    return ''.join(message_list)

def main():
    header()
    round_commencer()
    v1speak(Encrypt(Flag))
    
    
main()

