#include<iostream>
#include <random>
using namespace std;

// this is the old random number generator
int selectRandomsurah(int min , int max) {
    int randomint = 0;
    randomint = rand() % (max - min + 1) + min;
    return randomint;
}

// this is the new random number generator with a fair distribution
int selectrandonFair( int max) {
    int randomint = 0;
    do {
    max += 10;
    int maxtwo = max * max;
    randomint = (1.0*rand()/RAND_MAX)*maxtwo;
    randomint =  floor(sqrt(randomint));
    randomint -= max;
    randomint = abs(randomint);
    } while (randomint > max);
    return randomint;
}

// this is the original random number generator from stackoverflow (only on cpp, not js)
// https://stackoverflow.com/questions/33768435/c-rand-function-not-working-numbers-do-not-go-above-32-000
int getMyRandomNumber(int max)
{
    static int MY_RANGE_MAX = max;
    return (1.0*rand()/RAND_MAX)*MY_RANGE_MAX;
}

int main() {
int repeat[114] = {0};

for (int i = 0; i < 10000; i++) {
    int x = selectrandonFair(114);
    repeat[x - 1]++;
}
cout << endl;
for (int i = 0; i <= 113; i++) {
    cout << i + 1 << ": " << repeat[i] << " repeat = " << repeat[i] << "/1000" << endl;
}


return 0;
}
