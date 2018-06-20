FROM ubuntu:latest

RUN \
	chmod 755 run-docker.sh dockerscript.sh; \
	./dockerscript.sh;
