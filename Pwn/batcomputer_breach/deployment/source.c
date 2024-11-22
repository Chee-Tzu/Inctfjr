# include <stdio.h>
# include <stdlib.h>
# include <sys/mman.h>
# include <errno.h>
# include <unistd.h>

char input[50];

void init(){
setvbuf(stdin, NULL, _IONBF, 0);
setvbuf(stdout, NULL, _IONBF, 0);
}

//Red Text
void red () {
  printf("\033[1;31m");
}

//Green Text
void green() {
    printf("\033[32m");
}

//Yellow Text
void yellow() {
    printf("\033[33m");
}

//Blue Text
void blue() {
    printf("\033[36m");
}

//Reset Colour
void reset () {
  printf("\033[0m");
}

//Print Animation
char print_delay(const char *text, int delay) {
    for (int i = 0; text[i] != '\0'; i++) {
        printf("%c", text[i]);
        fflush(stdout);

        usleep(delay);
    }
}

void LoadingScreen() {
    print_delay("=========================================================\n",20000);
    print_delay("\t\tWAYNETEC MICROSYSTEMS\n",20000);
    print_delay("\tCOPYRIGHT (C) 2024, WAYNE ENTERPRISES\n",20000);
    print_delay("\t     BATCOMPUTER BOOTING SEQUENCE\n",20000);
    print_delay("=========================================================\n",20000);
    usleep(500000);
    printf("\tINITIALIZING BATCOMPUTER OPERATING SYSTEM   \n"); 
    print_delay("---------------------------------------------------------\n",20000);
    usleep(500000);
    printf("|\tLOADING SYSTEM DRIVERS\t\t\t\t|\n"); usleep(500000);
    printf("|\tDETECTING BATCAVE DRIVE\t\t\t\t|\n"); usleep(500000);
    printf("|\tACTIVATING NIGHT VISION MODE\t\t\t|\n"); usleep(500000);
    printf("|\tANALYZING BAT-SUIT STATUS\t\t\t|\n"); usleep(500000);
    printf("|\tDECRYPTING CLASSIFIED FILES\t\t\t|\n"); usleep(500000);
    printf("|\tSYSTEM INTEGRITY CHECK...\t\t\t|\n");
    print_delay("=========================================================\n",20000);
}

//Use v_synth to store shellcode in input buffer and rop mprotect()
int remhack() { 
    char buf[20];
    printf("\n[ REMOTE HACKING DEVICE ]\n");
    printf("\nINPUT SHELLCODE...\n>> ");
    
    scanf("%s",input);

    printf("\nEXECUTING...\n");
    sleep(1);
    printf("\nEXECUTION FAILED...\n");
    printf("\nSWITCHING TO ALTERNATIVE PATH...\n");
    printf("\nINPUT PAYLOAD...\n>> ");
    getchar();
    fgets(buf,48,stdin);
    return 0;
}

//Use to get leaks to bypass stack canary
int cryp_seq() {
    int sig;
    char signal[10];
    print_delay("\n[ CRYPTOGRAPHIC SEQUENCER ]\n",30000);
    // print_delay("\nWHICH SIGNAL DO YOU WANT TO LISTEN IN ON?\n>> ",30000);
    // scanf("%d",&sig);
    sig = 9;
    snprintf(signal,10,"%%%d$p",sig);
    print_delay("\nLEAKING MEMORY...\n",30000);
    print_delay("\nINTERCEPTED DATA: ",30000);
    printf(signal);
    puts("");
    return 0;
}

//Use to mprotect() input without rop
void disrupt() {
    print_delay("\n[ DISRUPTOR ]\n",30000);
    if (mprotect(0x404000,100, PROT_READ | PROT_WRITE | PROT_EXEC) == -1) {
        print_delay("\nDISRUPTOR OUT OF CHARGES...\n",30000);
        exit(errno);
    } else {
        print_delay("\nCHANGING PERMISSIONS...\n",30000);
        sleep(1);
        print_delay("\nCODE EXECUTION ALLOWED...\n",30000);
    }
}

int main() {
    init();
    // system("clear");
    red();
    LoadingScreen();
    green();
    print_delay("\nBEGINNING EXPLOIT...\n",30000);
    sleep(1);
    print_delay("\nDETECTING EXPLOIT PATH...\n",30000); sleep(1);
    blue(); print_delay("\n[",30000); yellow(); print_delay("*",30000);blue(); print_delay("]",30000); green();
    print_delay(" SHELLCODE EXPLOIT USABLE",30000);
    blue(); print_delay("\n[",30000); red(); print_delay("!",30000);blue(); print_delay("]",30000); green();
    print_delay(" STACK CANARY FOUND\n",30000);
    disrupt();
    cryp_seq();
    print_delay("\nTRANSFERRING CONTROL...\n",30000);
    sleep(2);
    reset();

    while (1) {
        int gadg = 0;

        printf("\n[ GADGETS ]\n\n[1] REMOTE HACKING DEVICE\n[2] CRYPTOGRAPHIC SEQUENCER\n[3] DISRUPTOR\n[4] GIVE UP\n>> ");
        scanf("%d",&gadg);

        switch(gadg) {
            case 1:
                remhack();
                break;
            case 2:
                cryp_seq();
                break;
            case 3:
                disrupt();
                break;
            case 4:
                blue();
                print_delay("\nBATMAN: All men have limits. They learn what they are and learn not to exceed them.....",60000);
                sleep(1);
                print_delay("I ignore mine.\n",60000);
                reset();
                exit(0);
        }
    }
}