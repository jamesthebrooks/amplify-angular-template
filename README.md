## Requirements

Install NVM and run Node 20+:
```
https://github.com/nvm-sh/nvm
https://github.com/coreybutler/nvm-windows#readme
```

Verify by:
```
nvm install 18
nvm use 18
node --version
```

Note that Amplify isn't compatible with node newer than 18 at the time of writing.

Global Requirements:
```
npm install -g @angular/cli
npm install -g @ionic/cli
npm install -g @aws-amplify/backend-cli 
```

The amplify cli is not the best for documentation, so check this out: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/amplifybackend/index.html. Also note that Gen 1 and Gen 2 are NOT compatible CLIs.

Works with the backend/ folder to manage resources like authentication, APIs, and storage.
Commands like:
```
amplify backend push
amplify backend pull
amplify backend generate
```
Integrates with CI/CD pipelines directly for managing backend code. These are not necessary as updating code and pushing to the repository will trigger a rebuild. Where it comes in handy is being able to quickly test updates without committing to your branch.

Other:
https://ui.docs.amplify.aws/angular/connected-components/authenticator

## User Setup

Set up an amplify user account:
```
npx amplify configure profile --name <yourusername>
```


## Running the app

These are all specified in the ```package.json``` file already.

To run the angular app locally:
```
"start": "concurrently -n \"ANGULAR,AMPLIFY\" -c \"green,blue\" \"npm run start-dev\" \"npm run amplify-sandbox\"",
```

To run without amplify sandbox:
```
"start-dev": "ionic serve",
```

To run the sandbox separately:
```
"amplify-sandbox": "npx @aws-amplify/backend-cli sandbox",
```

