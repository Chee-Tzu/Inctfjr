from Crypto.Util.number import bytes_to_long
import os
import sys
from time import sleep
import flag


def typewriter(words,delay):
    for char in words:
        sleep(delay)
        sys.stdout.write(char)
        sys.stdout.flush()

def header():
    
    typewriter("""\033[91m
 _                            _____                       
| |    __ _ _   _  ___ _ __  |_   _|_      _____          
| |   / _` | | | |/ _ \ '__|   | | \ \ /\ / / _ \   _____ 
| |__| (_| | |_| |  __/ |      | |  \ V  V / (_) | |_____|
|_____\__,_|\__, |\___|_|      |_|   \_/\_/ \___/         
            |___/                                         
  ____                                                            __ 
 / ___|___  _ ____   _____ _ __ __ _  ___ _ __   ___ ___    ___  / _|
| |   / _ \| '_ \ \ / / _ \ '__/ _` |/ _ \ '_ \ / __/ _ \  / _ \| |_ 
| |__| (_) | | | \ V /  __/ | | (_| |  __/ | | | (_|  __/ | (_) |  _|
 \____\___/|_| |_|\_/ \___|_|  \__, |\___|_| |_|\___\___|  \___/|_|  
                               |___/                                 
 _____     _       _     
|_   _| __(_) __ _| |___ 
  | || '__| |/ _` | / __|
  | || |  | | (_| | \__ \\
  |_||_|  |_|\__,_|_|___/
                         
               
\033[0m\n""",0.005)
    
def round_commencer():
    symbol = "█"
    
    typewriter(f"\033[91m{symbol*70}\033[0m\n",0.05)
    
def v1speak():
    
    typewriter(f"""\n\033[34m
Status: Online
Identity: V1
Location: Underworld
Goal: Break out of Underworld
Current Objective: Retrieve Data from Deceased Unit
Copying data....done.\n\033[0m""",0.05)
    
def xoring(text1,text2):

    result = bytes(a ^ b for a,b in zip(text1,text2))
    return result

def base_mod(n):
    result = ""
    n = bytes(n)
    n = bytes_to_long(n)
    while n > 0:
        digit = n % 3
        result = str(digit) + result
        n //= 3
    return result if result else "0"

def mapping(text1,text2):
    ct1 = str(base_mod(text1))
    ct1 = ct1.replace('0','High ')
    ct1 = ct1.replace('1','way ')
    ct1 = ct1.replace('2','Star ')
 
    ct2 = str(base_mod(text2))
    ct2 = ct2.replace('0','Fus ')
    ct2 = ct2.replace('1','Ro ')
    ct2 = ct2.replace('2','Dah ')
    print("\nciphertext 1: ", ct1 )
    print("\nciphertext 2: ", ct2)
    return ct1,ct2

text1 = os.urandom(37)
flag = flag.Flag

def main():
    header()
    round_commencer()
    v1speak()
    text2 = xoring(text1,flag)
    mapping(text1,text2)
    
main()


