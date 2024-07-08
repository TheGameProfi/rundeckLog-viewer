## Getting Started

### Using npm
First, edit the .env file for your use case
then, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Using Docker
#### build Docker Image
```bash
docker build -t thegameprofi/rundeck-viewer:v1.0.0 .
# for localhost:4440
docker run -e RD_TOKEN='token' thegameprofi/rundeck-viewer:v1.0.0
# else
docker run -e RD_TOKEN='token' -e RD_URL='url:port' thegameprofi/rundeck-viewer:v1.0.0
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
```
___________.__             ________                     __________                _____.__ 
\__    ___/|  |__   ____  /  _____/_____    _____   ____\______   \_______  _____/ ____\__|
  |    |   |  |  \_/ __ \/   \  ___\__  \  /     \_/ __ \|     ___/\_  __ \/  _ \   __\|  |
  |    |   |   Y  \  ___/\    \_\  \/ __ \|  Y Y  \  ___/|    |     |  | \(  <_> )  |  |  |
  |____|   |___|  /\___  >\______  (____  /__|_|  /\___  >____|     |__|   \____/|__|  |__|
                \/     \/        \/     \/      \/     \/
```
