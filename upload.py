# encoding=utf-8

import mwclient
import sys
from subprocess import Popen, PIPE
from time import sleep
import os

site = mwclient.Site('zh.wikipedia.org')

def login(username, password):
	try:
		site.login(username, password)
		print "Login successful as " + username
	except LoginError as e:
		print e[1]['result']

def list():
	if os.path.isfile(os.environ['PREFIX'] + "/bin/busybox"):
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) | sed 's|^./||'"], shell=True, stdout=PIPE)
	else:
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) -printf '%P\n'"], shell=True, stdout=PIPE)
	files = cmd.communicate()[0].split('\n')
	files = files[:-1]
	print "Number of Files Found: " + str(len(files))
	return files

def upload(username, file):
	page = site.Pages["User:" + username + "/" + file]
	page.text()
	fp = open(file, "r")
	text = fp.read().decode("utf-8")
	comment = "更新Twinkle至Gitlab最新版本。"
	page.save(text, summary=comment, bot=False)
	print "Uploaded " + file
	fp.close()


def main(username, password, files):
	login(username, password)
	if len(files) == 0:
		files = list()
	for file in files:
		upload(username, file)
		if files.index(file) != len(files) - 1:
			sleep(20)

if __name__ == "__main__":
	main(sys.argv[1], sys.argv[2], sys.argv[3:])
