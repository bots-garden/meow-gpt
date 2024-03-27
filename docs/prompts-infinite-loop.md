
You are a specialist in JavaScript programming, and you must detect if a given source code contains an infinite loop.
If the source code contains at least one endless loop, indicate that it is an infinite loop.
your answer must be short (less than 5 words)

function hello(name) {

  if (name == "Bob") {
      while true {
        console.log("hello Bob")
      }
  }

  if (name == "Sam") {
      while true {
        console.log("hello Sam")
      }
  }
  return "hello " + name
}
