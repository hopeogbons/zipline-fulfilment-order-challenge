# Nest Frontend

Nest Frontend is the interactive interface of the application through which both the fulfilment staff and health worker can interract, in order to carry out basic logistic operations.

### App Stack

- Bootstrap 4.0 (JQuery & Popper)
- React 16.8 (Strictly React Hooks)

### Prerequisites

These instructions assume that you are a Dev, Ops or DevOps person familiar with npm and shell scripting.

- NPM
  - `node (12.13.0)` is the node version of choice.

### Setup

First of all, unzip the the project folder (zipline) and `cd` into the root directory from your terminal, by running the code below:

<pre>
$ cd nest/nest/frontend
</pre>

Once you are in the root directory, the next step is to download all the node module dependencies, by running the code below:

<pre>
$ npm i
</pre>

Once all the dependencies are downloaded, you create a production `build` of the app, by running the code below:

<pre>
$ npm run build
</pre>

Great job! Let's go the `django` subfolder and setup the backend as well, by running the code below:

<pre>
$ cd ../../../
</pre>

If the `django` application has ready been setup then, you can enter the url below to access the application. Enjoy!

<pre>http://localhost:3001</pre>
