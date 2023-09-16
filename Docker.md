# Задание 1

    docker pull busybox

    Using default tag: latest
    latest: Pulling from library/busybox
    3f4d90098f5b: Pull complete
    Digest: sha256:3fbc632167424a6d997e74f52b878d7cc478225cffac6bc977eedfe51c7f4e79
    Status: Downloaded newer image for busybox:latest
    docker.io/library/busybox:latest

*не вижу в опциях команды ping количества пингов, общепринятый флаг, вроде как -с, но тут это не так работает.
запускаю с флагом -i чтобы в логи не сыпалось слишком много...*

>        -4,-6           Force IP or IPv6 name resolution
>        -c CNT          Send only CNT pings
>        -s SIZE         Send SIZE data bytes in packets (default 56)
>        -i SECS         Interval
>        -A              Ping as soon as reply is received
>        -t TTL          Set TTL
>        -I IFACE/IP     Source interface or IP address
>        -W SEC          Seconds to wait for the first response (default 10)
>                        (after all -c CNT packets are sent)
>        -w SEC          Seconds until ping exits (default:infinite)
>                        (can exit earlier with -c CNT)
>        -q              Quiet, only display output at start/finish
>        -p HEXBYTE      Payload pattern


    docker run --name pinger -i -t busybox ping -i 20 netology.ru

    docker ps -a
    CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
    9d3b8004740a   busybox   "ping -i 20 netology…"   37 seconds ago   Up 36 seconds             pinger


    docker logs -f -t pinger
    2023-09-16T12:45:30.868860140Z PING netology.ru (188.114.98.224): 56 data bytes
    2023-09-16T12:45:30.908104081Z 64 bytes from 188.114.98.224: seq=0 ttl=62 time=39.214 ms
    2023-09-16T12:45:50.884421402Z 64 bytes from 188.114.98.224: seq=1 ttl=62 time=15.282 ms
    2023-09-16T12:46:10.884042391Z 64 bytes from 188.114.98.224: seq=2 ttl=62 time=14.597 ms

Следующий шаг:

> Запустите второй раз контейнера с именем pinger

Не понял что это значит, останавливаю контейнер, логи тоже останавливаются

    docker stop pinger
    pinger

Запускаю снова

    docker start pinger
    pinger


    docker ps -a
    CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS          PORTS     NAMES
    9d3b8004740a   busybox   "ping -i 20 netology…"   3 minutes ago   Up 36 seconds             pinger

    docker logs -f -t pinger
    2023-09-16T12:45:30.868860140Z PING netology.ru (188.114.98.224): 56 data bytes
    2023-09-16T12:45:30.908104081Z 64 bytes from 188.114.98.224: seq=0 ttl=62 time=39.214 ms
    2023-09-16T12:45:50.884421402Z 64 bytes from 188.114.98.224: seq=1 ttl=62 time=15.282 ms
    2023-09-16T12:46:10.884042391Z 64 bytes from 188.114.98.224: seq=2 ttl=62 time=14.597 ms
    2023-09-16T12:48:51.864696139Z PING netology.ru (188.114.98.224): 56 data bytes
    2023-09-16T12:48:51.881831455Z 64 bytes from 188.114.98.224: seq=0 ttl=62 time=16.743 ms
    2023-09-16T12:49:11.879367746Z 64 bytes from 188.114.98.224: seq=1 ttl=62 time=13.680 ms
    2023-09-16T12:49:31.879833730Z 64 bytes from 188.114.98.224: seq=2 ttl=62 time=14.043 ms
    2023-09-16T12:49:51.891127755Z 64 bytes from 188.114.98.224: seq=3 ttl=62 time=25.256 ms
    2023-09-16T12:50:11.880154431Z 64 bytes from 188.114.98.224: seq=4 ttl=62 time=14.062 ms
    2023-09-16T12:50:31.882855124Z 64 bytes from 188.114.98.224: seq=5 ttl=62 time=16.255 ms

    docker rm pinger -f

    docker rmi busybox



# Задание 2

    docker pull node:15.14
    15.14: Pulling from library/node
    bfde2ec33fbc: Pull complete
    787f5e2f1047: Pull complete
    7b6173a10eb8: Pull complete
    dc05be471d51: Pull complete
    55fab5cadd3c: Pull complete
    bd821d20ef8c: Pull complete
    6041b69671c6: Pull complete
    989c5d2d2313: Pull complete
    4b57d41e8391: Pull complete
    Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Status: Downloaded newer image for node:15.14
    docker.io/library/node:15.14


    docker run --name mynode --env NAME=ALEX --env SURNAME=PETROV -i -t --rm node
    Unable to find image 'node:latest' locally
    latest: Pulling from library/node
    012c0b3e998c: Pull complete
    00046d1e755e: Pull complete
    9f13f5a53d11: Pull complete
    e13e76ad6279: Pull complete
    95103e803d28: Pull complete
    2138282ff175: Pull complete
    4f9fde731574: Pull complete
    562365e2a70f: Pull complete
    Digest: sha256:14bd39208dbc0eb171cbfb26ccb9ac09fa1b2eba04ccd528ab5d12983fd9ee24
    Status: Downloaded newer image for node:latest
    Welcome to Node.js v20.6.1.

    Type ".help" for more information.
    > console.log(`Hello, ${process.env.NAME} ${process.env.SURNAME}!`)
    Hello, ALEX PETROV!


    docker stop mynode
    mynode


    docker rmi node:15.14
    Untagged: node:15.14
    Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
    Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
    Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
    Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
    Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
    Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
    Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
    Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
    Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
    Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7





# Задание 3

    docker pull node:15.14
    15.14: Pulling from library/node
    bfde2ec33fbc: Pull complete
    787f5e2f1047: Pull complete
    7b6173a10eb8: Pull complete
    dc05be471d51: Pull complete
    55fab5cadd3c: Pull complete
    bd821d20ef8c: Pull complete
    6041b69671c6: Pull complete
    989c5d2d2313: Pull complete
    4b57d41e8391: Pull complete
    Digest: sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Status: Downloaded newer image for node:15.14
    docker.io/library/node:15.14


    docker run --name first_node -i -t --rm -d -v C:\Users\a777p\Documents\Netology\node-project\data:/var/first/data node /bin/sleep infinity
    Unable to find image 'node:latest' locally
    latest: Pulling from library/node
    012c0b3e998c: Pull complete
    00046d1e755e: Pull complete
    9f13f5a53d11: Pull complete
    e13e76ad6279: Pull complete
    95103e803d28: Pull complete
    2138282ff175: Pull complete
    4f9fde731574: Pull complete
    562365e2a70f: Pull complete
    Digest: sha256:14bd39208dbc0eb171cbfb26ccb9ac09fa1b2eba04ccd528ab5d12983fd9ee24
    Status: Downloaded newer image for node:latest
    81785b8d80d8a861756e1900d0b0fdbfc43f6af5e08b45a2c12604a83f974ea8

    docker run --name second_node -i -t --rm -d -v C:\Users\a777p\Documents\Netology\node-project\data:/var/second/data node /bin/sleep infinity
    0367e6e10baae9127d669578783aa92546d9e5e77d84e7015d1ff2a4010618a7

    docker ps -a
    CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS     NAMES
    0367e6e10baa   node      "docker-entrypoint.s…"   14 seconds ago   Up 13 seconds             second_node
    81785b8d80d8   node      "docker-entrypoint.s…"   2 minutes ago    Up 2 minutes              first_node

    docker exec -i -t first_node touch /var/first/data/file.txt

Файл local.txt создаем локально

    docker exec -i -t second_node ls /var/second/data/
    file.txt  local.txt

    docker exec -i -t second_node cat /var/second/data/local.txt
    Hello, Petrov!

    docker stop first_node second_node
    first_node
    second_node

    docker rmi node:15.14
    Untagged: node:15.14
    Untagged: node@sha256:608bba799613b1ebf754034ae008849ba51e88b23271412427b76d60ae0d0627
    Deleted: sha256:3d3f41722daf1a77c34d6eade6676bbffa2d6a2a21095de2ab0c427a5c942fc9
    Deleted: sha256:601382991a159cfc5013ad973158f30b7b7a913e8d7e547b3456deab3ad98022
    Deleted: sha256:d5db49eecae8c02c9ea3a79f89c43ded9162bac118a0302a7b514d0df82aa112
    Deleted: sha256:a2c1973858d0aad3de0927294602b17c8ef9050c30e0f461e0868997a08552a4
    Deleted: sha256:a0153172017a08a521a8be971ca4dcb5fbc4b7227642c12bbb2da6265bd66b50
    Deleted: sha256:f1123940e954d335d91b52a40fab4f8144f38ff113ade7d65663071d0f06da6f
    Deleted: sha256:f1f4fbb0e7e6e0ce2d9eae1e577f9f6df0a719dd874bff00b2d08895c75c297d
    Deleted: sha256:1eb455ab6d45fdbbd90fccff791ffa228080c052acf464f8da1b1d78650bd706
    Deleted: sha256:1dbe832a694971a925d7d216f49b700c95f402bd72288f9d37eceb1d59dcf72d
    Deleted: sha256:2f4ee6a2e1b5dfb9236cd262e788f9d39109242ca27a4aacb583c8af66ec3ff7