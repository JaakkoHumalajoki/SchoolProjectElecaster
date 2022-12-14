# summary

Elecaster was a Tampere University course project in the spring of 2021 where we had free reign to choose our own technology stack for the given task. Our group of 4 students decided to do the project as a web app using React, TypeScript, Highcharts, Tailwind and Axios. Further information about the task and the original documents can be read in the sections below. The project was handled using GitLab, which doesn't allow access without login permits. This is why I copied the project code here, since we had agreed on making the project into something we could showcase in our portfolios. 

On GitLab we used Issue board as a task management tool, to handle who was working on what features. For project communication we used Teams, and we held weekly / biweekly scrum meetings to discuss our progress and sprint goals. During the project, I was mainly responsible for Frontend coding, and created most of the React components and handled showing data with Highcharts.

The app is currently still up and running at [https://elecaster.netlify.app/](https://elecaster.netlify.app/), although some piece of the backend API seems to have broken over the last year. The API was very convoluted and outdated even back then, so it is unsurprising that they may have changed or removed it.

# _Elecaster_ - 0xc0ff3e software design project

This is Tampere University course COMP.SE.110-2020-2021-1 Software Design course repository.

## View the app in production

Latest version of the application is deployed automatically by CI/CD pipeline. See it here [https://elecaster.netlify.app/](https://elecaster.netlify.app/)

## Documentation

Documentation built for every commit is stored at [https://docs--elecaster.netlify.app/](https://docs--elecaster.netlify.app/)

Design document can be found from [docs](/docs/design.md)

## The assignment

The assignment is defined as follows:

> In this project, the student groups will design and implement a piece of software for monitoring electricity consumption in parallel with weather forecast. How much electricity is used has a lot to do with the weather ??? in addition to simply cranking up the heat when the weather is cold, also windy weather will often lead to adjusting the heating. Additionally, there are nowadays several power sources (solar power, wind power) that directly depend on the weather.

## Setting up the development environment

Follow the instructions below on how to start up develompnet on your local machine

#### 0. Ensure Node.js and npm are installed on your system. 

You may check if Node.js and npm is installed by running in the following command in your shell

```sh
node --version
v15.7.0
npm --version
7.4.3
```

if the either above command doesn't return anything or throws an error, check your Node.js and npm installation.

##### Windows 

You may download installer from [here](https://nodejs.org/en/). Use the latest version available

##### Linux

Preferrably see if node and npm are available from your OS repositories. See [here](https://nodejs.org/en/download/package-manager/) for more infromation. 

If your OS repositories do not include Node.js or it is too old, you may try [nvm](https://github.com/nvm-sh/nvm#installing-and-updating). 

### Starting up the development server

Open the `app`-folder

#### 1. Create `.env` file

Create `.env` with the following content inside the `./app`-direcory. Replace the `xxxxxxxxxx` with your Fingrid api key

```
REACT_APP_FINGRID_API_KEY=xxxxxxxxxx
```

*(On Windows Explorer you need to name the file `.env.` first and then Explorer will rename it to `.env` when you save the file)*

#### 2. Install dependecies

with your shell, run (**inside the app directory**)

```sh
npm install
```

#### 3. Start up the development server

If everything goes well you can now start the development environment by running

```sh
npm start
```

The development server should start listening on [http://localhost:3000](http://localhost:3000) (or other port if you are already using it). Any change in the source files will automatically rebuild the application and you can see the changes immediately in your browser

### Building release version

Follow the same steps as above but instead of running `npm start`, run `npm run build`. The production build will run and the complied application is placed in `./app/build`

## The team

- Jaakko Humalajoki
- Teemu Helenius
- Toni Immonen
- Santeri Siiranen
