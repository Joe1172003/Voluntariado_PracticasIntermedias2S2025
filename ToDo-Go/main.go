package main

import (
	"log"
	"net/http"
)

func main() {
	initStore()
	r := setupRouter()

	log.Println("API :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
