# _Elecaster_ - 0xc0ff3e software design project

This is Tampere University course COMP.SE.110-2020-2021-1 Software Design course repository.

## Run the app

To run the app you need node.js runtime.

### Windows

Download node.js installer from node [website](https://nodejs.org/en/). Run the installer with default settings.

After installing you should be able to run

```powershell
node -v
```

to check if you have installed node succesfully. It should output the version number that you have installed. Any 15 -> should work. We have tested 15.6.0.

Node comes with npm (node package manager) that handles installing the required packages to run the app. You can now install the required packages **inside the app directory** with powershell/CMD by running

```powershell
npm i
```

If everything goes well you can now run the app by running

```powershell
npm start
```

It should compile succesfully and open the app in browser in localhost:3000 (or other port if you are already using it).

### Linux

Easiest way to manage node installations is with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) (node version manager). You should be able to follow the instructions to install nvm. Run following command to check if you nvm is installed.

```bash
nvm -v
0.38.0
```

Note the troubleshoot section. If nvm -v doesn't work try to close and open again the terminal.

After installing nvm you can install v.15.6.0 of node by running

```bash
nvm install 15.6.0
```

Node comes with npm (node package manager) that handles installing the required npm to run the app. You can now install the required packages **inside the app directory** by running

```bash
npm i
```

If everything goes well you can now run the app by running

```bash
npm start
```

It should compile succesfully and open the app in browser in localhost:3000 (or other port if you are already using it).

## View the app in production

Latest version of the application is deployed automatically by CI/CD pipeline. See it here [https://elecaster.netlify.app/](https://elecaster.netlify.app/)

## The assignment

The assignment is defined as follows:

> In this project, the student groups will design and implement a piece of software for monitoring electricity consumption in parallel with weather forecast. How much electricity is used has a lot to do with the weather – in addition to simply cranking up the heat when the weather is cold, also windy weather will often lead to adjusting the heating. Additionally, there are nowadays several power sources (solar power, wind power) that directly depend on the weather.

## Documentation

Documentation built for every commit is stored at [https://docs--elecaster.netlify.app/](https://docs--elecaster.netlify.app/)

Design document can be found from /docs/design.md

### Prototypes

See the prototypes at [Figma](https://figma.com) from links below

- [Desktop](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=57%3A158&scaling=scale-down)
- [Mobile](https://www.figma.com/proto/hUkQpST2beG7YZ00qm2K2q/Prototype?node-id=20%3A933&scaling=scale-down)

## The team

- Jaakko Humalajoki
- Teemu Helenius
- Toni Immonen
- Santeri Siiranen
