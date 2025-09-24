package main

import (
	"net/http"

	"github.com/gorilla/mux"
)

func setupRouter() http.Handler {
	r := mux.NewRouter()

	r.HandleFunc("/todos", listHandler).Methods(http.MethodGet)
	r.HandleFunc("/todos", createHandler).Methods(http.MethodPost)
	r.HandleFunc("/todos/{id}", updateHandler).Methods(http.MethodPut)
	r.HandleFunc("/todos/{id}/done", doneHandler).Methods(http.MethodPatch)
	r.HandleFunc("/todos/{id}", deleteHandler).Methods(http.MethodDelete)

	r.HandleFunc("/health", func(w http.ResponseWriter, _ *http.Request) {
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write([]byte("ok"))
	}).Methods(http.MethodGet)

	return r
}
