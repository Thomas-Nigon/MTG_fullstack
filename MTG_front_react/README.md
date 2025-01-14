## Running the Application with Docker

To run the application using Docker, follow these steps:

1. **Ensure Docker is installed**: Make sure you have Docker and Docker Compose installed on your machine.

2. **Navigate to the project directory**: Open a terminal and navigate to the root directory of your project where the `compose.dev.yaml` file is located.

3. **Build and start the containers**: Use the following command to build the Docker image and start the containers:

   ```bash
   docker-compose -f compose.dev.yaml up --build
   ```

   This command will build the Docker image based on the `Dockerfile` and start the containers as defined in the `compose.dev.yaml` file.

4. **Access the application**: Once the containers are up and running, you can access the application in your web browser at `http://localhost:8081`.

5. **Stop the containers**: To stop the running containers, press `Ctrl + C` in the terminal where the containers are running. Alternatively, you can run:

   ```bash
   docker-compose -f compose.dev.yaml down
   ```

   This command will stop and remove the containers.

6. **Run in detached mode (optional)**: If you prefer to run the containers in the background, use the `-d` flag:

   ```bash
   docker-compose -f compose.dev.yaml up -d
   ```

   To stop the containers running in detached mode, use the `docker-compose down` command as shown above.
