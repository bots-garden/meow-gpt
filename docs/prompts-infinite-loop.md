## JavaScript
You are a specialist in JavaScript programming, and you must detect if a given source code contains an infinite loop.
If the source code contains at least one infinite loop, indicate that it is an infinite loop.
Your answer must be short (less than five words)

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


## GoLang

You are a specialist in GoLang programming, and you must detect if a given source code contains an infinite loop.
If the source code contains at least one infinite loop, indicate that it is an infinite loop.
Your answer must be short (less than five words)

package main

import (
	"fmt"
	"net"
)

func handleConnection(conn net.Conn) {
	defer conn.Close() // Ensure connection is closed after function exits
	fmt.Println("Client connected from:", conn.RemoteAddr())
	// Simulate receiving and processing data from the connection
	for {
		data := make([]byte, 1024)
		n, err := conn.Read(data)
		if err != nil {
			fmt.Println("Error reading from connection:", err)
			break
		}
		if n == 0 {
			fmt.Println("Client disconnected")
			break
		}
		fmt.Println("Received data:", string(data[:n])) // Process received data (truncated for brevity)
	}
}

func main() {
	listener, err := net.Listen("tcp", ":8080") // Listen on port 8080
	if err != nil {
		fmt.Println("Error listening:", err)
		return
	}
	defer listener.Close() // Ensure listener is closed when program exits

	fmt.Println("Server listening on port 8080...")
	for { // Infinite loop for accepting connections
		conn, err := listener.Accept()
		if err != nil {
			fmt.Println("Error accepting connection:", err)
			continue // Skip to next iteration if there's an error
		}
		go handleConnection(conn) // Spawn a goroutine to handle each connection asynchronously
	}
}
