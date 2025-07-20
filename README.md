# AI Job Tracker
![landing](https://github.com/user-attachments/assets/d2d199a0-abcf-4610-8954-33e92cf1c17e)

# Architecture 
<img width="1626" height="1070" alt="image" src="https://github.com/user-attachments/assets/ab248e3c-17f7-4ddf-907c-57e9a39a9900" />


# Requirements
- ![Docker](https://www.docker.com/)
- ![Docker Compose](https://docs.docker.com/compose/)

# Local Run Instructions
1. Install all requirements.
2. Clone project and navigate to directory.
3. Run `make env` to rename all `.env.example` and `env.db.example` files to `.env` and `.env.db`.
4. Add your OPENAI_API_KEY to `image_analyzer/.env`.
5. Start all services through `docker compose up`
6. Access the tracker through ![http://localhost:5173/](http://localhost:5173/).

