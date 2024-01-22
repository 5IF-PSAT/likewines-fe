# likewines-fe
## Table of Contents
- [likewines-fe](#likewines-fe)
  - [Table of Contents](#table-of-contents)
- [How to run](#how-to-run)

# How to run
1. Build a docker image
```bash
docker build -t likewines-fe:latest .
```

2. Run a docker container
```bash
docker run -d -p 5173:5173 --name likewines-fe likewines-fe:latest
```
