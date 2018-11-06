# encoding=utf-8

from mwclient import Site as SetSite
from sys import argv
from os import path, environ
from subprocess import Popen, PIPE
from time import sleep, time
from hashlib import sha256
from getpass import getpass
import rjsmin, rcssmin

site = SetSite('zh.wikipedia.org')

def login(username, password):
	try:
		site.login(username, password)
		print "Login successful as %s" % username
	except LoginError as e:
		print e[1]['result']

def list():
	if path.isfile("%s/bin/busybox" % environ['PREFIX']):
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) | sed 's|^./||'"], shell=True, stdout=PIPE)
	else:
		cmd = Popen(["find . \( -name '*.js' -o -name '*.css' \) -printf '%P\n'"], shell=True, stdout=PIPE)
	files = cmd.communicate()[0].split('\n')[:-1]
	print "Number of Files Found: %s" % str(len(files))
	return files

def upload(username, file):
	start = time()
	page = site.Pages["User: %s/%s" % (username, file)]

	fp = open(file, "r")
	text = fp.read()
	fp.close()

	if file.find(".js") != -1:
		text = rjsmin.jsmin(text)
		text = "// <nowiki>\n" + text + "\n// </nowiki>"
	elif file.find(".css") != -1:
		text = rcssmin.cssmin(text)

	if sha256(page.text().encode("utf-8")).hexdigest() == sha256(text).hexdigest():
		print "%s unchanged" % file
		return 0

	comment = "更新Twinkle至Gitlab最新版本。"
	page.save(text.decode("utf-8"), summary=comment, bot=False)
	print "Uploaded %s" % file
	end = time()
	return 15 + start - end

def main(username, password, files):
	login(username, password)
	if len(files) == 0:
		files = list()
	for file in files:
		t = upload(username, file)
		if files.index(file) != len(files) - 1:
			sleep(t)

if __name__ == "__main__":
	main(argv[1], getpass('密碼：'), argv[2:])
