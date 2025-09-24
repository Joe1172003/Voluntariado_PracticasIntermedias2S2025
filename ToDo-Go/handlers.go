package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func listHandler(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, listTodos())
}

func createHandler(w http.ResponseWriter, r *http.Request) {
	var in struct {
		Title string `json:"title"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		httpError(w, http.StatusBadRequest, "json inválido")
		return
	}
	t, err := createTodo(in.Title)
	if err != nil {
		statusByErr(w, err)
		return
	}
	writeJSON(w, http.StatusCreated, t)
}

func updateHandler(w http.ResponseWriter, r *http.Request) {
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		httpError(w, 400, "id inválido")
		return
	}
	var in struct {
		Title string `json:"title"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		httpError(w, 400, "json inválido")
		return
	}
	t, err := updateTodo(id, in.Title)
	if err != nil {
		statusByErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, t)
}

func doneHandler(w http.ResponseWriter, r *http.Request) {
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		httpError(w, 400, "id inválido")
		return
	}
	var in struct {
		Done bool `json:"done"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		httpError(w, 400, "json inválido")
		return
	}
	t, err := setDone(id, in.Done)
	if err != nil {
		statusByErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, t)
}

func deleteHandler(w http.ResponseWriter, r *http.Request) {
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil || id <= 0 {
		httpError(w, 400, "id inválido")
		return
	}
	if err := deleteTodo(id); err != nil {
		statusByErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"success": true,
		"message": "eliminado correctamente",
	})
}

func writeJSON(w http.ResponseWriter, code int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(v)
}

func httpError(w http.ResponseWriter, code int, msg string) {
	writeJSON(w, code, map[string]string{"error": msg})
}

func statusByErr(w http.ResponseWriter, err error) {
	switch err {
	case ErrNotFound:
		httpError(w, http.StatusNotFound, err.Error())
	case ErrBadInput:
		httpError(w, http.StatusBadRequest, err.Error())
	default:
		httpError(w, http.StatusInternalServerError, "error")
	}
}
