---
title: "mysql 공부 환경 with container"
date: 2023-06-17 13:19
categories:
  - mysql
---

## 1. Install podman

podman은 docker와 같은 컨테이너 플랫폼.

```shell

# MAC OS
brew install podman

# After installed
podman machine init
podman machine start

```

## 2. Run mysql container

```shell

# 1. Search mysql image
podman search mysql --filter=is-official

# 2. pull mysql image
podman pull docker.io/library/mysql

# 3. Show downloaded image
podman images

# REPOSITORY               TAG         IMAGE ID      CREATED       SIZE
# docker.io/library/mysql  latest      1732fe3340d5  28 hours ago  602 MB

# 4. Start mysql container
podman run --name sql-tutorial -e MYSQL_ROOT_PASSWORD=0000 -d docker.io/library/mysql

# 5. Show running container
podman ps

# CONTAINER ID  IMAGE                           COMMAND     CREATED        STATUS        PORTS       NAMES
# 1d0d518d3828  docker.io/library/mysql:latest  mysqld      3 seconds ago  Up 3 seconds              sql-tutorial

```

## 3. Create mysql session

```shell
# 1. mysql 컨테이너 터미널에 mysql 커맨드를 실행
podman exec -it sql-tutorial mysql -u root -p

# Enter password:
# Welcome to the MySQL monitor.  Commands end with ; or \g.
# Your MySQL connection id is 8
# Server version: 8.0.33 MySQL Community Server - GPL

# Copyright (c) 2000, 2023, Oracle and/or its affiliates.

# Oracle is a registered trademark of Oracle Corporation and/or its
# affiliates. Other names may be trademarks of their respective
# owners.

# Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

# 2. Show databases

mysql> SHOW DATABASES;

# +--------------------+
# | Database           |
# +--------------------+
# | information_schema |
# | mysql              |
# | performance_schema |
# | sys                |
# +--------------------+
# 4 rows in set (0.02 sec)

```

## Reference

- [podman](https://podman.io/docs)
