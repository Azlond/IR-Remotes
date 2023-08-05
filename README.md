# Midea FS40-15FR IR Control

simple interface to control the Midea FS40-15FR fan via a Raspberry pi using an infrared LED

## Dependencies
- codes were retrieved using the misc/irslinger-codes.py code, made available by Bryan Schwind (https://blog.bschwind.com/2016/05/29/sending-infrared-commands-from-a-raspberry-pi-without-lirc/).

- IR codes are sent using ir-slinger, also by Bryan Schwind (https://github.com/bschwind/ir-slinger). `x` and `y` values may need to be adjusted based on the raspberry by in use, refer to the blogpost for the required values

## Run

use docker and/or docker-compose to build and a reverse proxy to map the port to your liking.