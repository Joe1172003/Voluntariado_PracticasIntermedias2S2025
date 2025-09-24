package main

import "time"

type Todo struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Done      bool      `json:"done"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Store struct {
	items map[int]Todo
}

var store Store
var nextID int

func initStore() {
	store = Store{items: make(map[int]Todo)}
	nextID = 0
}
