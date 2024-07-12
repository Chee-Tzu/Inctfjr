import random
import sys
from time import sleep


FLAG='inctfj{r4nd0mn355_h45_b33n_4b0053d}'

class HP:

    bars = 20
    remaining_health_symbol = "█"
    lost_health_symbol = "░"

    color_green = "\033[92m"
    color_yellow = "\33[33m"
    color_red = "\033[91m"
    color_purple = "\33[95m"
    color_blue1 = "\33[34m"
    color_blue2 = "\33[36m"
    color_default = "\033[0m"
    

    def __init__(self, max_health, current_health, name, health_color):
        self.max_health = max_health
        self.current_health = current_health
        self.remaining_health_bars = round(self.current_health / self.max_health * HP.bars)
        self.lost_health_bars = HP.bars - self.remaining_health_bars
        self.health_color = health_color
        self.name = name

    def update(self, current):
        self.current_health = current
        self.remaining_health_bars = round(self.current_health / self.max_health * HP.bars)
        self.lost_health_bars = HP.bars - self.remaining_health_bars

    def bar_colour_updater(self):
            # health color update
        if self.current_health > 0.66 * self.max_health:
            self.health_color = HP.color_green
        elif self.current_health > 0.33 * self.max_health:
            self.health_color = HP.color_yellow
        else:
            self.health_color = HP.color_red

    def alter_bar_colour_updater(self):
        if self.current_health > 0.66 * self.max_health:
            self.health_color = HP.color_purple
        elif self.current_health > 0.33 * self.max_health:
            self.health_color = HP.color_blue1
        else:
            self.health_color = HP.color_blue2

    def __repr__(self):
        return str(self.name)
    

def typewriter(words,delay):
    for char in words:
        sleep(delay)
        sys.stdout.write(char)
        sys.stdout.flush()


def display(Player,Gabriel):
    print(f"\n {Player}: {str(Player.current_health).zfill(4)} / {Player.max_health}",f"{Gabriel}: {str(Gabriel.current_health).zfill(5)} / {Gabriel.max_health}".rjust(47,' '))
    print(f"|{Player.health_color}{Player.remaining_health_bars * Player.remaining_health_symbol}"f"{Player.lost_health_bars * Player.lost_health_symbol}{HP.color_default}|",f"|{Gabriel.health_color}{Gabriel.remaining_health_bars * Gabriel.remaining_health_symbol}"f"{Gabriel.lost_health_bars * Gabriel.lost_health_symbol}{HP.color_default}|".rjust(50,' '))


def skip_cutscene():
    typewriter("""\033[96mApproaching the surface...expecting maximum security\nCombat mode: EXTREME MEASURES\ninitiate?\n""",0.05)
    choice = input("\n>> ")
    if choice == 'skip':
        return 0
    print("\033[91m=\033[0m"*120,end='')
    return 1


def header():
    typewriter("""\033[91m
 _____ _             _   _
|  ___(_)_ __   __ _| | | |    __ _ _   _  ___ _ __
| |_  | | '_ \\ / _` | | | |   / _` | | | |/ _ \\ '__|  _____
|  _| | | | | | (_| | | | |__| (_| | |_| |  __/ |    |_____|
|_|   |_|_| |_|\\__,_|_| |_____\\__,_|\\__, |\\___|_|
                                    |___/
 _   _                 _          __    ____           _
| | | | __ _ _ __   __| |   ___  / _|  / ___| ___   __| |
| |_| |/ _` | '_ \\ / _` |  / _ \\| |_  | |  _ / _ \\ / _` |
|  _  | (_| | | | | (_| | | (_) |  _| | |_| | (_) | (_| |
|_| |_|\\__,_|_| |_|\\__,_|  \\___/|_|    \\____|\\___/ \\__,_|


\033[0m\n""",0.005)


def quote(): #Easter egg for the people who solve Runic Cipher
    typewriter("\n\033[91m\"ᛁ ᛟᚠᚠᛖᚱ ᛁᛟᚢ ᛟᚾᛖ ᛚᚨᛊᛏ ᚲᚺᚨᚾᚲᛖ ᚨᛏ ᚱᛖᛞᛖᛗᛈᛏᛟᚾ....... ",0.03)
    sleep(1)
    typewriter("ᛗᚨᚲᚺᛁᚾᛖ, ᛏᚢᚱᚾ ᛒᚨᚲᚲ... ᚾᛟᚹ. ᚹᚺᚨᛏᛖᚢᛖᚱ ᚺᛖᛚᛞ ᛁᛟᚢ ᚨᛏ ᛒᚨᛁ ᛞᛟᛖᛊ ᚾᛟᛏ ᚲᛟᛗᛈᚨᚱᛖ ᛏᛟ ᚦᛖ ᚱᛁᚷᚺᛏᛖᛟᚢᛊ ᚺᚨᚾᛞ ᛟᚠ ᚷᛟᛞ...... \n",0.03)
    sleep(1)
    typewriter("ᛏᚢᚱᚾ ᛒᚨᚲᚲ, ᛟᚱ ᛁᛟᚢ ᚹᛁᛚᛚ ᛒᛖ ᚲᚱᛟᛊᛊᛁᛜ ᚦᛖ ᚹᛁᛚᛚ ᛟᚠ ᚷᛟᛞ.\"\033[0m\n",0.03)
    typewriter("""\033[96m...\n...\n...\n\033[0m\n""",0.2)
    

def battle_choose():
    typewriter("\33[95mFlee??",0.2)
    sleep(1)
    typewriter("........or Engage?\33[96m",0.1)
    choice = input("\n>> ")
    return choice


def round_commencer():
    typewriter(f"\033[91m{HP.remaining_health_symbol*70}\033[96m\n\n",0.05)
    typewriter("""Final layer, seals........broken\nScanning surrounding area
...
...
one unknown lifeform of extreme intelligence detected.\033[0m\n""", 0.1)
    sleep(1)


def start():
    typewriter("\033[91m\"!!?\nVery well then, your choice has been made. As the righteous hand of God, I will rend you apart and you will become inanimate once more!!!\"\033[0m\n",0.02)
    sleep(1)


def chooser():
    try:
        return input("""\n\033[36mChoose your counter move\n\33[95m
            |\tParry\t|\tSlash\t|\tSweep\t|
            |-----------+---------------+---------------|
            |\tBlitz\t|\tSmite\t|\tThrust\t|\n\33[0m
\33[96m>>  """)
    except:
        typewriter("\33[91mAn imperfection to be cleansed...\33[0m\n",0.03)
        print("\n\033[95mYou did nothing useful and the Entity chose to combo you to oblivion, you have been defeated.\33[0m\n")
        sys.exit()


def taunt(random):
    taunt_list=["You defy the light!","A mere object!","There can be only light!","Foolishness, machine. Foolishness.", "An imperfection to be cleansed...", "Not. Even. Mortal.", "Your code isn't working perhaps?", "You are less than nothing", "You're an error to be corrected!","The light IS perfection!", "You are outclassed!", "Your crime is existence!", "You make even the DEVIL CRY!"]
    return taunt_list[random%len(taunt_list)]


def check(Player):
    if Player.current_health<=0:
        return 1
    return 0


def battle_container():

    header()
    round_commencer()
    quote()

    if battle_choose().lower() == 'engage':
        start()
    else:
        typewriter("\33[91mAn imperfection to be cleansed...\33[0m\n",0.03)
        typewriter("\33[95mMachine chose to flee the battle, The Entity crushes it from behind..\33[0m",0.03)
        sys.exit()

    print()
    print("\033[91m=\033[0m"*120,end='')
    print('')
    



def main():
    if skip_cutscene():
        battle_container()
    
    options = ['parry', 'slash', 'sweep', 'blitz', 'smite', 'thrust']
    Player = HP(7901,7901, "V1", "\033[92m")
    Gabriel = HP(10000,10000, "Gabriel","\33[95m")
    
    display(Player,Gabriel)
    
    for _ in range(180):

        full_random = random.getrandbits(256)
        attack = full_random % 6
        Player_countermove = chooser().lower()

        if Player_countermove == 'tank':
            print(f"\n\033[36mEntity chose {options[attack]} but you chose {Player_countermove}, the Entity's wrath is shown onto you.\033[0m\n")
            
            Player.update(Player.current_health-100)
            Player.bar_colour_updater()
            
            display(Player,Gabriel)
            print(f"\033[91m\n{taunt(full_random)}\033[0m")
            print(f"\n\033[36mAtop of the Entity's head something mysterious appears... '{full_random}'\033[0m\n")

        elif Player_countermove == options[(attack-1)%6]:
            print(f"\n\033[36mEntity chose {options[attack]} and you countered it perfectly using {Player_countermove}!\033[0m\n")

            Gabriel.update(Gabriel.current_health-100)
            Gabriel.alter_bar_colour_updater()
            
            display(Player,Gabriel)
            
            print(f"\n\033[36mAtop of the Entity's head something mysterious appears... '{full_random}'\033[0m\n")

        elif Player_countermove == options[attack]:
            print("\n\033[36mThe Entity used ᚢᚾᚲᚾᛟᚹᚾ, you received damage through undefined means...\033[0m\n")
            
            Player.update(Player.current_health-100)
            Player.bar_colour_updater()
            
            display(Player,Gabriel)
            print(f"\033[91m\n{taunt(full_random)}\033[0m")
            print(f"\n\033[36mAtop of the Entity's head something mysterious appears... '{full_random}'\033[0m\n")
        
        elif Player_countermove not in options:
            Player.update(Player.current_health-Player.current_health)
            Player.bar_colour_updater()
            
            display(Player,Gabriel)

            typewriter(f"\033[91m\nMay your woes be many, and your days few.\033[0m",0.02)
            typewriter("\n\033[95mYou did nothing useful and the Entity chose to combo you to oblivion, you have been defeated.\33[0m\n",0.02)
            
            break

        else:
            print(f"\n\033[36mEntity chose {options[attack]} but you chose {Player_countermove}, the Entity's wrath is shown onto you.\033[0m\n")
            
            Player.update(Player.current_health-100)
            Player.bar_colour_updater()
            
            display(Player,Gabriel)

            print(f"\033[91m\n{taunt(full_random)}\033[0m")
            print(f"\n\033[36mAtop of the Entity's head something mysterious appears... '{full_random}'\033[0m\n")
        
        if check(Player):
            typewriter(f"\033[91m\nPure rust, Failure.\033[0m",0.02)
            typewriter("\n\033[95mThe Entity ripped your core out and threw it into the underworld, you have been brutally defeated.\33[0m\n",0.02)
            break

        sleep(2)
        display(Player,Gabriel)
        print()
        
        if Gabriel.current_health <= 0:

            typewriter(f"\033[91m\"What...? How can this be? Bested by this... this... thing?  ᛏᚺᛖ ᚠᛚᚨᚷ ᚲᛟᚾᛏᚨᛁᚾᛖᛞ ᛁᛊ ᛚᛖᚲᛁᛜ....\33[95m {FLAG}\033[91m\"\033[0m",0.03)
            typewriter(f"\n\n\033[95mGabriel, the Apostate of Hate, the Entity, disappears..and V1 reaches the surface, with its objective concluded.\033[0m",0.03)
            break

main()
