package main

import "net/http"

func main() {
	setupAPI()
}

// responsible for setting up http routes
func setupAPI() {
	http.Handle("/", http.FileServer(http.Dir("./frontend")))
}
