# include <stdio.h>
# include <stdlib.h>
# include <string.h>
# include <unistd.h>

void init() {
setvbuf(stdin, NULL, _IONBF, 0);
setvbuf(stdout, NULL, _IONBF, 0);
}

char print_delay(const char *text, int delay) {
    for (int i = 0; text[i] != '\0'; i++) {
        printf("%c", text[i]);
        fflush(stdout);

        usleep(delay);
    }
}

void red() {
    printf("\033[0;31m");
}

void yellow() {
    printf("\033[0;33m");
}

void reset() {
    printf("\033[0m");
}

void DispPrice() {
    yellow();
    print_delay("____________________________________________________\n",10000);
    print_delay("|\t\t\t\t\t\t    |\n",10000);
    red();
    print_delay("| SNO.\tTYPE\t\tPRICE($)\tDISCOUNT(%) |\n",10000);
    yellow();
    print_delay("| 1\tWHITE\t\t50\t\t10\t    |\n",10000);
    red();
    print_delay("| 2\tDARK\t\t60\t\t12\t    |\n",10000);
    yellow();
    print_delay("| 3\tRAW\t\t42\t\t6\t    |\n",10000);
    red();
    print_delay("| 4\tBITTERSWEET\t55\t\t8\t    |\n",10000);
    yellow();
    print_delay("|___________________________________________________|\n",10000);
    reset();
}

void ret2win() {
    FILE* file;
    char type[100];
    char flag[100];
    file = fopen("flag.txt","r");
    fgets(flag,100,file);
    printf("\nRET2WIN FUNCTION EXECUTED...\n");
    printf("WHAT'S MY PREFERRED CHOCOLATE TYPE?\n>> ");
    scanf("%s",type);
    if (strstr(type,"DARK") == 0) {
        printf("SORRY...WRONG ANSWER.\n");
        // return 0;
    } else {
        printf("WELL DONE! HERE's THE FLAG: %s",flag);
        // return 0;
    }
}

int chocmenu() {
    int choc;
    int choice;
    char chocs[4][7] = {"WHITE","DARK","RAW","BITTER"};
    printf("\nWOULD YOU LIKE SOME CHOCOLATE?\n[1] YES\n[2] NO\n>> ");
    scanf("%d",&choice);
    while (choice < 1 || choice > 2) {
        printf("INVALID CHOICE");
        scanf("%d",&choice);
    }

    if (choice == 2) {
        printf("GOODBYE THEN...\n");
        return 0;
    }

    printf("\nCHOOSE YOUR CHOCOLATE TYPE:\n[1] WHITE\n[2] DARK\n[3] RAW\n[4] BITTER\n>> ");
    scanf("%d",&choc);
    if (choc <= 4 && choc > 0) {
        printf("YOU'VE CHOSEN %s CHOCOLATE\n",chocs[choc-1]);
    } else {
        printf("INVALID CHOICE.\n");
        return 5;
    }
    return choc;
}

int chocnum() {
    int num;
    printf("\nENTER THE NO. OF CHOCOLATES YOU WANT\n>> ");
    scanf("%d",&num);
    return num;
}

void trackchoc(int a, int b, int c, int d) {
    if (a != 0) {
        printf("\nWHITE CHOCOLATES: %d",a);
    } if (b != 0) {
        printf("\nDARK CHOCOLATES: %d",b);
    } if (c != 0 ) {
        printf("\nRAW CHOCOLATES: %d",c);
    } if (d != 0 ) {
        printf("\nBITTER CHOCOLATES: %d",d);
    }
}

int main() {
    
    init();

    char chocs[4][7] = {"WHITE","DARK","RAW","BITTER"};
    char name[64];
    int choc = 1, num = 0, tot;
    int whtchoc = 0, drkchoc = 0, rawchoc = 0, bitchoc = 0;
    float disc, price;
    
    red();
    print_delay("  _____ _    _  ____   _____    _____ _    _  ____  _____  \n",10000);
    yellow();
    print_delay(" / ____| |  | |/ __ \\ / ____|  / ____| |  | |/ __ \\|  __ \\ \n",10000);
    red();
    print_delay("| |    | |__| | |  | | |      | (___ | |__| | |  | | |__) |\n",10000);
    yellow();
    print_delay("| |    |  __  | |  | | |       \\___ \\|  __  | |  | |  ___/ \n",10000);
    red();
    print_delay("| |____| |  | | |__| | |____   ____) | |  | | |__| | |     \n",10000);
    yellow();
    print_delay(" \\_____|_|  |_|\\____/ \\_____| |_____/|_|  |_|\\____/|_|     \n",10000);
    DispPrice();
    
    while (choc) {
        whtchoc = 0, drkchoc = 0, rawchoc = 0, bitchoc = 0;
        choc = chocmenu();
        if (choc == 5) {
            continue;
        } else if (choc) {
            num = chocnum();
            printf("\nENTER YOUR NAME: ");
            scanf("%s",name);
        }

        switch (choc) {
            case 1:
                disc = 0.1;
                price = 50 * (1.0-disc) * num;
                whtchoc += num;
                break;
            case 2:
                disc = 0.12;
                price = 60 * (1.0-disc) * num;
                drkchoc += num;
                break;
            case 3:
                disc = 0.06;
                price = 42 * (1.0-disc) * num;
                rawchoc += num;
                break;
            case 4:
                disc = 0.08;
                price = 55 * (1.0-disc) * num;
                bitchoc += num;
                break;
        }

        if (choc == 2 && num != 0) {
            printf("\nRECEIPT: ");
            printf("\nNAME: ");
            printf(name);
            trackchoc(whtchoc, drkchoc, rawchoc, bitchoc);
            printf("\nYOU'VE BOUGHT %d %s CHOCOLATES for %.2f.\n",num,chocs[choc-1],price);
        } else if (choc && num != 0) {
            printf("\nRECEIPT: ");
            printf("\nNAME: ");
            printf("%s",name);
            trackchoc(whtchoc, drkchoc, rawchoc, bitchoc);
            printf("\nYOU'VE BOUGHT %d %s CHOCOLATES for %.2f.\n",num,chocs[choc-1],price);
        } else if (choc && num == 0) {
            printf("CHANGED YOUR MIND?\n");
        }
    }
    exit(0);
}