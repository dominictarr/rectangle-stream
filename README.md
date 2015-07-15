# rectangle-stream

streaming realtime rectangle(web) design.

I'm sure i'll rename this module, but I haven't decided what name yet.

## Inspiration

This is a front-end framework inspired by _the terminal_,
doesn't that just sound like a terrible idea? well, I will
explain what I think that a modern user inteface system can
learn from the terminal, but first how the terminal works.

```
TYPEWRITER <--- PHONE LINE ---> COMPUTER
```
A standard input/output device is connected to a computer
via a wire. The earliest terminals where "teletypes", basically
typewriters attached to the phone line.
The protocol that this speaks can be thought of as like a graphics
format, but not a format -- a protocol.

What is the difference between a _format_ and a _protocol_?
A format is static, to make a change to a instance you edit that,
possibly inserting changes throughout. A protocol is not a file,
it's a connection. As long as the connection remains open,
you can send more, but here is the catch: you can only append to the end.

However, the terminal has sendable commands to _move the cursor_,
and commands to clear or overwrite old data. This is what makes it
possible to have a progress bar or text editor in the terminal.
The terminal was streaming and realtime long before the web was.

So, instead of simply sending data describing what to display,
we send commands to change things on the screen.
The simplest command is "append"


``` js
{"append": ["h1", {"id": "heading"}, "Hello World"]}
```
This adds the html: `<h1 id=heading>Hello World</h1>`
but we since we gave it an id, we can append to that too,
simply specify what element we are refering to.

``` js
{"append": "!!!", "id": "heading"}
```
This will update the page to `<h1 id=heading>Hello World!!!</h1>`

## License

MIT
