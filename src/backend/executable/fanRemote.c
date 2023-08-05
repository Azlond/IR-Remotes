#include <stdio.h>
#include <stdlib.h>
#include "irslinger.h"
#include <time.h>

// based on Bryan Schwinds Ir-Slinger: https://github.com/bschwind/ir-slinger/
// compilation: gcc -o fan fanRemote.c -lm -lpigpio -pthread -lrt


int main(int argc, char *argv[]) {
	uint32_t outPin = 18;           // The Broadcom pin number the signal will be sent on
	int frequency = 38000;          // The frequency of the IR signal in Hz
	double dutyCycle = 0.5;         // The duty cycle of the IR signal. 0.5 means for every cycle,
	                                // the LED will turn on for half the cycle time, and off the other half
	int leadingPulseDuration = 4500; // The duration of the beginning pulse in microseconds
	int leadingGapDuration = 2200;   // The duration of the gap in microseconds after the leading pulse
	int x = 300;			// value for a short pulse used with my raspberry pi 3 B (about 850 microseconds)
	int y = 800;			// value for a long pulse used with my raspberry pi 3 B (about 1750 microseconds)
	int onePulse = x;              // The duration of a pulse in microseconds when sending a logical 1
	int zeroPulse = x;             // The duration of a pulse in microseconds when sending a logical 0
	int oneGap = y;               // The duration of the gap in microseconds when sending a logical 1
	int zeroGap = x;               // The duration of the gap in microseconds when sending a logical 0
	int sendTrailingPulse = 1;       // 1 = Send a trailing pulse with duration equal to "onePulse"

	if (argc == 2) {		//only one command line argument
		char *fancode = argv[1];				// IR binary code. short pulses 0, long pulses 1
		int result = irSling(
			outPin,
			frequency,
			dutyCycle,
            leadingPulseDuration,
		    leadingGapDuration,
            onePulse,
    		zeroPulse,
    		oneGap,
    		zeroGap,
            sendTrailingPulse,
            fancode);
		return result;
	} else {
		printf("One argument expected.");
	}
}
