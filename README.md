# Smart Home Dashboard Project

Create an interactive smart home dashboard using Homey, Kindle, and Raspberry Pi to seamlessly integrate and visualize data from your Homey smart hub. The application uses `Finnish Meteorological Institute` and `Foreca` APIs to fetch weather data.

## Overview

This project aims to develop a feature-rich smart home dashboard, facilitating seamless communication between Kindle, Raspberry Pi, and Homey. The Kindle device initiates a request to the Raspberry Pi, utilizing Puppeteer to capture a screenshot that encapsulates real-time data from Homey. This dynamic screenshot is then relayed back to the Kindle for clear and informative display.

## UI

- All devices displayed on the UI are designated as favorites by your Homey user.

- Ensure that your device name is included in the `frontend/src/config.ts file`.

- You have the flexibility to modify the names of devices appearing in the UI by adjusting the mapping in `frontend/src/config.ts`.

- Zone names are retrived from your homey configuration.

## Prerequisites

Ensure the following components are set up before proceeding with the installation:

### Raspberry Pi

1. **Raspberry Pi OS Installation:**

   - Download [Raspberry Pi OS](https://www.raspberrypi.com/software/) and set up Wi-Fi.

2. **Docker Compose Installation:**

   ```bash
   sudo apt-get update && sudo apt-get upgrade
   curl -fsSL test.docker.com -o get-docker.sh && sh get-docker.sh
   sudo apt-get install libffi-dev libssl-dev
   sudo apt install python3-dev
   sudo apt-get install -y python3 python3-pip
   sudo pip3 install docker-compose
   sudo systemctl enable docker
   ```

3. **To fix Puppeteer Insuffienct resource issue:**

   - If you experience high memory usage with Puppeteer, a solution is to restart the Docker container in which Puppeteer is running. This action effectively resets the memory usage, providing a quick and effective remedy for potential memory-related issues."Puppeteer runs. This helps to reset the memory usage.

     ```bash
     chmod +x /YOUR_LOCAL_PATH/full_stack_dashboard/restart_container.sh
     crontab -e
     0 * * * * /YOUR_LOCAL_PATH/full_stack_dashboard/restart_container.sh # Runs beginning of every hour
     crontab -l # To view existing cronjobs
     grep CRON /var/log/syslog # Cronjob logs
     ```

### Kindle Integration

1. **Screenshot Request Script:**

   - Create a script to send requests for screenshots:
     ```bash
     vi /mnt/us/script.sh
     ```
   - Add the following content to the script:
     ```
     curl http://IP_ADDRESS_OF_RASPBERRY_PI:8081/captures -o status.png
     eips -c
     eips -c
     eips -g status.png
     ```
   - Ensure the script runs successfully before setting up a cron job.

2. **Cron Job Setup:**

   - Set up a cron job for the script:
     ```bash
     vi /etc/crontab/root
     ```
   - Add the following line to run the script every minute:
     ```bash
     * * * * * /mnt/us/script.sh  # Runs every minute
     ```
   - Restart your Kindle or run `/etc/init.d/cron` restart.

3. **To fix a read-only issue, if encountered:**

   ```bash
     mntroot rw
     chmod +w /etc/crontab/root
     vi /etc/crontab/root
     mntroot ro
   ```

### Environment variables

An example environment file is located at /api/src. Please fill in the required information and rename the file to .env before launching the application.

| Feature                 | Description                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------- |
| HOMEY_USER_EMAIL        | The email of your homey user.                                                                           |
| HOMEY_USER_PASSWORD     | The password of your homey user.                                                                        |
| HOMEY_USER_ID           | Extract the Homey user ID from the URL (https://accounts.athom.com/login) following a successful login. |
| HOMEY_CLIENT_ID         | Retrieve your Homey Client ID from https://tools.developer.homey.app/api/projects.                      |
| HOMEY_CLIENT_SECRET     | Retrieve your Homey Client Secret from https://tools.developer.homey.app/api/projects.                  |
| HOMEY_CLOUD_ID          | Retrieve your Homey Cloud ID from https://tools.developer.homey.app/tools/system.                       |
| HOMEY_OUTDOOR_SENSOR_ID | This is a sensor which provides humidity and temperature.                                               |
| WEATHER_PLACE           | Can be left empty. Retrieve it from https://www.foreca.fi/Finland/Helsinki/Tapanila                     |
| WEATHER_CITY            | Retrieve your city from https://www.foreca.fi/Europe/Finland/haku                                       |
| WEATHER_LOCATION_ID     | Extract the Location ID from the URL https://www.foreca.com/100634928/Tapanila-Helsinki-Finland         |

## How to Run the Application on Raspberry PI

Follow these steps to run the application after completing the setup:

1. **Copy Necessary Files to Raspberry Pi:**
   - Use scp to copy the required files to your Raspberry Pi. Replace ./full_stack_dashboard with the actual path to your project directory.
     ```bash
       scp -r ./full_stack_dashboard user_name@IP_ADDRESS_OF_RASPBERRY_PI:/home/user_name
     ```
2. **Start Docker Compose:**
   - Once the files are copied, navigate to the project directory on your Raspberry Pi and use the following command to start Docker Compose. Ensure that you are in the correct directory containing the docker-compose.yml file. This command will initiate the setup and launch the application. Make sure Docker Compose is installed on your Raspberry Pi before running this command.
     ```bash
     docker-compose up -d
     ```

## How to Run the Application locally

Ensure you have Node.js and npm installed on your machine. After completing these steps, the application should be accessible locally. Follow these steps to run the application on your local machine:

1. **Configure Environment:**

   - Locate the example environment file at /api/src.
   - Fill in the required information.
   - Rename the file to .env before proceeding.

2. **Run API:**

   ```
   cd ./api
   npm install
   npm run dev
   ```

3. **Run BACKEND:**

   ```
   cd ./backend
   npm install
   npm run dev
   ```

4. **Run FRONTEND:**
   ```
   cd ./frontend
   npm install
   npm run start
   ```
