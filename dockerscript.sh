#!/bin/sh

apt update
apt -y upgrade
apt -y install python python-pip git nano
pip install mwclient rjsmin rcssmin
