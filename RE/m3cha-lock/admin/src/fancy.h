#include <unistd.h>
#include <stdio.h>

void typeWriter(const char* text) {
    printf("%s", (const char *)"\033[1;31m");  
    int delay = 50;
    for (const char* p = text; *p != '\0'; p++) {
        putchar(*p);
        fflush(stdout); 
        usleep(delay * 1000);  
    }
    usleep(delay * 10000);
    printf("\033[0m");  
}

void clearScreen() {
    printf("\033[H\033[J");
}