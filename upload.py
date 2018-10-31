# encoding=utf-8

from mwclient import Site as SetSite
from sys import argv
from os import path, environ
from subprocess import Popen, PIPE
from time import sleep
from hashlib import sha256

site = SetSite('zh.wikipedia.org')

def login(username, password):
	try:
		site.login(username, password)
		print "Login successful as " + username
	except LoginError as e:
		print e[1]['result']

def list():
	if path.isfile(environ['PREFIX'] + "/bin/busybox"):
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) | sed 's|^./||'"], shell=True, stdout=PIPE)
	else:
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) -printf '%P\n'"], shell=True, stdout=PIPE)
	files = cmd.communicate()[0].split('\n')
	files = files[:-1]
	print "Number of Files Found: " + str(len(files))
	return files

def upload(username, file):
	page = site.Pages["User:" + username + "/" + file]
	fp = open(file, "r")
	text = fp.read()[:-1].rstrip()
	fp.close()
	if sha256(page.text().encode("utf-8")).hexdigest() == sha256(text).hexdigest():
		print file + " unchanged"
		return 0
	comment = "更新Twinkle至Gitlab最新版本。"
	page.save(text.decode("utf-8"), summary=comment, bot=False)
	print "Uploaded " + file
	return 20

def main(username, password, files):
	login(username, password)
	if len(files) == 0:
		files = list()
	for file in files:
		t = upload(username, file)
		if files.index(file) != len(files) - 1:
			sleep(t)

if __name__ == "__main__":
	main(argv[1], argv[2], argv[3:])
