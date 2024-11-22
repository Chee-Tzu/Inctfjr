#include <unistd.h> 
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>
#include <signal.h>


#define FLAGSIZE_MAX 64
int count = 0;

char flag[FLAGSIZE_MAX];
char dest[200] = "";

void init(){
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stdout, NULL, _IONBF, 0);
}

void sigsegv_handler(int sig) {
    fflush(stdout);
    exit(1);
}

void banner(){
    printf("\n\n\n\n");
    printf("       \033[0;94m@@@@@@@@\033[0m  \033[0;94m@@       @@  \033[0;94m @@@@@@   \033[0;94m   @@@@@  \033[0;94m@@@@@@        \033[0;94m @@@@@@   \033[0;94m@@       @@  \033[0;94m @@@@@@   \033[0;94m @@@@@@   \033[0;94m@@    @@  \033[0;94m@@@@@@@@  \033[0;94m@@@@@@@       \033[0m\n");
    printf("       \033[0;94m@@      \033[0m  \033[0;94m@@@     @@@  \033[0;94m@@    @@  \033[0;94m      @@  \033[0;94m  @@          \033[0;94m@@    @@  \033[0;94m@@@     @@@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m@@        \033[0;94m@@    @@      \033[0m\n");
    printf("       \033[0;94m@@      \033[0m  \033[0;94m@@@@   @@@@  \033[0;94m@@    @@  \033[0;94m      @@  \033[0;94m  @@          \033[0;94m@@        \033[0;94m@@@@   @@@@  \033[0;94m@@    @@  \033[0;94m@@        \033[0;94m@@    @@  \033[0;94m@@        \033[0;94m@@    @@      \033[0m\n");
    printf("       \033[0;94m@@@@@   \033[0m  \033[0;94m@@ @@ @@ @@  \033[0;94m@@    @@  \033[0;94m      @@  \033[0;94m  @@          \033[0;94m @@@@@@   \033[0;94m@@ @@ @@ @@  \033[0;94m@@@@@@@@  \033[0;94m @@@@@@   \033[0;94m@@@@@@@@  \033[0;94m@@@@@     \033[0;94m@@@@@@@       \033[0m\n");
    printf("       \033[0;94m@@      \033[0m  \033[0;94m@@  @@@  @@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m  @@          \033[0;94m      @@  \033[0;94m@@  @@@  @@  \033[0;94m@@    @@  \033[0;94m      @@  \033[0;94m@@    @@  \033[0;94m@@        \033[0;94m@@    @@      \033[0m\n");
    printf("       \033[0;94m@@      \033[0m  \033[0;94m@@   @   @@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m  @@          \033[0;94m@@    @@  \033[0;94m@@   @   @@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m@@    @@  \033[0;94m@@        \033[0;94m@@    @@      \033[0m\n");
    printf("       \033[0;94m@@@@@@@@\033[0m  \033[0;94m@@       @@  \033[0;94m @@@@@@   \033[0;94m @@@@@@   \033[0;94m@@@@@@        \033[0;94m @@@@@@   \033[0;94m@@       @@  \033[0;94m@@    @@  \033[0;94m @@@@@@   \033[0;94m@@    @@  \033[0;94m@@@@@@@@  \033[0;94m@@    @@      \033[0m\n");
    printf("\n\n");
}

char* generateRandomEmoji() {
    char* emojis[] = {"\xF0\x9F\x98\x80", "\xF0\x9F\x98\x81", "\xF0\x9F\x98\x82", "\xF0\x9F\x98\x83",
                      "\xF0\x9F\x98\x84", "\xF0\x9F\x98\x85", "\xF0\x9F\x98\x86", "\xF0\x9F\x98\x87",
                      "\xF0\x9F\x98\x89", "\xF0\x9F\x98\x8A", "\xF0\x9F\x98\x8B", "\xF0\x9F\x98\x8C",
                      "\xF0\x9F\x98\x8D", "\xF0\x9F\x98\x8F", "\xF0\x9F\x98\x90", "\xF0\x9F\x98\x91",
                      "\xF0\x9F\x98\x92", "\xF0\x9F\x98\x93", "\xF0\x9F\x98\x94", "\xF0\x9F\x98\x95",
                      "\xF0\x9F\x98\x96", "\xF0\x9F\x98\x97", "\xF0\x9F\x98\x98", "\xF0\x9F\x98\x99",
                      "\xF0\x9F\x98\x9A", "\xF0\x9F\x98\x9B", "\xF0\x9F\x98\x9C", "\xF0\x9F\x98\x9D",
                      "\xF0\x9F\x98\x9E", "\xF0\x9F\x98\x9F", "\xF0\x9F\x98\xA0", "\xF0\x9F\x98\xA1",
                      "\xF0\x9F\x98\xA2", "\xF0\x9F\x98\xA3", "\xF0\x9F\x98\xA4", "\xF0\x9F\x98\xA5",
                      "\xF0\x9F\x98\xA6", "\xF0\x9F\x98\xA7", "\xF0\x9F\x98\xA8", "\xF0\x9F\x98\xA9",
                      "\xF0\x9F\x98\xAA", "\xF0\x9F\x98\xAB", "\xF0\x9F\x98\xAC", "\xF0\x9F\x98\xAD",
                      "\xF0\x9F\x98\xAE", "\xF0\x9F\x98\xAF", "\xF0\x9F\x98\xB0", "\xF0\x9F\x98\xB1",
                      "\xF0\x9F\x98\xB2", "\xF0\x9F\x98\xB3", "\xF0\x9F\x98\xB4", "\xF0\x9F\x98\xB5",
                      "\xF0\x9F\x98\xB6", "\xF0\x9F\x98\xB7", "\xF0\x9F\x98\xB8", "\xF0\x9F\x98\xB9",
                      "\xF0\x9F\x98\xBA", "\xF0\x9F\x98\xBB", "\xF0\x9F\x98\xBC", "\xF0\x9F\x98\xBD",
                      "\xF0\x9F\x98\xBE", "\xF0\x9F\x98\xBF"};

    int numEmojis = sizeof(emojis) / sizeof(emojis[0]);
    int randomIndex = rand() % numEmojis;
    return emojis[randomIndex];
}

int main(){
    init();
    banner();
    signal(SIGSEGV, sigsegv_handler);
    char name[] = "Secret";
    char buf[100] = " ";
    printf("\nYour data: %p -> %s", buf, buf);
    printf("\nMy data: %p -> %s", name, name);
    printf("\n\n>> ");
    
    FILE *f = fopen("flag.txt","r");
    fgets(flag,FLAGSIZE_MAX,f);

    while(1){
        
        char input[10]; 
        input[0] = getchar();

        strncat(dest, input, 1);

        if((int)input[0] == 10){
            printf("\n");
            strcpy(buf, dest);
            break;
        }
        count++;
    }

    printf("\nYour data: %p -> ", buf);

    for(int i=0; i<count; i++){
        srand(i);
        printf("%s", generateRandomEmoji());
    }
    printf("\nMy data: %p -> %s", name, name);
    if(!strcmp(name, "Secret")){
        puts("\nDo you really think its that easy to smash me?? \U0001F61E");
    }
    else{
        printf("\nOh, you smashed me!! Here is your flag : %s", flag);
    }

    return 0;
}