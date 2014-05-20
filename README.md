# ChangeTip IRC Bot client

A basic demo of consuming the IRC bot's restful api.
[Click](http://changetip-client.herokuapp.com/) to see.

TODO: If there's no data then the root network has reconnected. Currently the ID is hardcoded on the client.  This will be fixed, obviously.

## Install and Run

* Clone the repo

    ```sh
    $ git clone git@github.com:jimlyndon/changetip-irc.git
    ```

* Install [Node and the Node package manager (NPM)](http://http://nodejs.org/)

* Install Bower (client side package manager) using NPM:

    ```sh
    $ npm install -g bower
    ```

* Install Grunt (task runner) using NPM:

    ```sh
    $ npm install -g grunt-cli
    ```

* Install dependencies in working directory:

    ```sh
    $ cd changetip-irc
    $ [sudo] npm install
    $ bower install
    ```

* Start server with Grunt:

    ```sh
    $ grunt serve
    ```

## History

For detailed changelog, check [Releases](https://github.com/jimlyndon/changetip-irc-client/releases).
