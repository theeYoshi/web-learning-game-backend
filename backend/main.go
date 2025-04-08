package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Challenge struct for your API
type Challenge struct {
	Question string `json:"question"`
}

// Handler for the challenge API
func challengeHandler(w http.ResponseWriter, r *http.Request) {
	challenge := Challenge{
		Question: "What is the regex for matching one or more digits?",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(challenge)
}

func main() {
	frontendDir := "./frontend"
	absPath, err := filepath.Abs(frontendDir)
	if err != nil {
		log.Fatal("Error getting absolute path:", err)
	}

	log.Println("Serving static files from:", absPath)
	fs := http.FileServer(http.Dir(frontendDir))
	http.Handle("/", fs)

	// API endpoint
	http.HandleFunc("/api/challenge", challengeHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server started at http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
