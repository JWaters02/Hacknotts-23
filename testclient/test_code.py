#!/usr/bin/python

from foo import bar
import datetime
import json
import pathlib
import shutil
import sys
import urllib.request

date_13w39a = datetime.datetime(2013, 9, 26, 15, 11, 19, tzinfo = datetime.timezone.utc)
date_17w15a = datetime.datetime(2017, 4, 12, 9, 30, 50, tzinfo = datetime.timezone.utc)
date_1_17_pre1 = datetime.datetime(2021, 5, 27, 9, 39, 21, tzinfo = datetime.timezone.utc)
date_1_18_1_rc3 = datetime.datetime(2021, 12, 10, 3, 36, 38, tzinfo = datetime.timezone.utc)

def main():
    if len(sys.argv) != 2:
        print('Usage: ' + sys.argv[0] + ' <version>')
        return
    version = sys.argv[1]

    print('Fetching Minecraft versions')
    with urllib.request.urlopen('https://piston-meta.mojang.com/mc/game/version_manifest_v2.json') as f:
        version_manifest = json.load(f)

    version_url = None
    for ver in version_manifest['versions']:
        if ver['id'] == version:
            version_url = ver['url']
            break
    if version_url is None:
        print('No such version: ' + version)
        return

    try:
        pathlib.Path(version).mkdir()
    except FileExistsError:
        print('Version already downloaded: ' + version)
        return

    with urllib.request.urlopen(version_url) as f:
        version_json = json.load(f)

    if 'server' not in version_json['downloads']:
        print('There is no server for ' + version)
        return

    release_time = datetime.datetime.fromisoformat(version_json['releaseTime'])

    server_url = version_json['downloads']['server']['url']
    print('Downloading server for ' + version)
    with urllib.request.urlopen(server_url) as fin, open(version + '/server.jar', 'wb') as fout:
        shutil.copyfileobj(fin, fout)

    print('Finishing up')
    with open(version + '/eula.txt', 'w') as f:
        f.write('eula=true\n')
    with open(version + '/server.properties', 'w') as f:
        f.write('enable-command-block=true\n')
        f.write('max-players=1\n')
        f.write('sync-chunk-writes=false\n')

    try:
        with open('ops.json') as fin, open(version + '/ops.json', 'w') as fout:
            fout.write(fin.read())
    except FileNotFoundError:
        pass

    run_command = 'java'

    if date_13w39a <= release_time < date_1_17_pre1:
        if release_time < date_17w15a:
            log4j_fix_url = 'https://launcher.mojang.com/v1/objects/4bb89a97a66f350bc9f73b3ca8509632682aea2e/log4j2_17-111.xml'
            log4j_fix_file = 'log4j2_17-111.xml'
        else:
            log4j_fix_url = 'https://launcher.mojang.com/v1/objects/02937d122c86ce73319ef9975b58896fc1b491d1/log4j2_112-116.xml'
            log4j_fix_file = 'log4j2_112-116.xml'
        with urllib.request.urlopen(log4j_fix_url) as fin, open(version + '/' + log4j_fix_file, 'wb') as fout:
            shutil.copyfileobj(fin, fout)
        run_command += ' -Dlog4j.configurationFile=' + log4j_fix_file
    elif date_1_17_pre1 <= release_time < date_1_18_1_rc3:
        run_command += ' -Dlog4j2.formatMsgNoLookups=true'

    run_command += ' -jar server.jar nogui'
    with open(version + '/run_server', 'w') as f:
        f.write(run_command + '\n')
    pathlib.Path(version + '/run_server').chmod(0o755)


if __name__ == '__main__':
    main()

