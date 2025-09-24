package main

import (
	"errors"
	"strings"
	"time"
)

var (
	ErrNotFound = errors.New("todo no encontrado")
	ErrBadInput = errors.New("title requerido")
)

func createTodo(title string) (Todo, error) {
	title = strings.TrimSpace(title)
	if title == "" {
		return Todo{}, ErrBadInput
	}
	now := time.Now()
	nextID++
	t := Todo{ID: nextID, Title: title, Done: false, CreatedAt: now, UpdatedAt: now}
	store.items[t.ID] = t
	return t, nil
}

func getTodo(id int) (Todo, error) {
	t, ok := store.items[id]
	if !ok {
		return Todo{}, ErrNotFound
	}
	return t, nil
}

func listTodos() []Todo {
	out := make([]Todo, 0, len(store.items))
	for _, t := range store.items {
		out = append(out, t)
	}
	return out
}

func updateTodo(id int, title string) (Todo, error) {
	t, ok := store.items[id]
	if !ok {
		return Todo{}, ErrNotFound
	}
	tt := strings.TrimSpace(title)
	if tt == "" {
		return Todo{}, ErrBadInput
	}
	t.Title = tt
	t.UpdatedAt = time.Now()
	store.items[id] = t
	return t, nil
}

func setDone(id int, done bool) (Todo, error) {
	t, ok := store.items[id]
	if !ok {
		return Todo{}, ErrNotFound
	}
	t.Done = done
	t.UpdatedAt = time.Now()
	store.items[id] = t
	return t, nil
}

func deleteTodo(id int) error {
	if _, ok := store.items[id]; !ok {
		return ErrNotFound
	}
	delete(store.items, id)
	return nil
}
