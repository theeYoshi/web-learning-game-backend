package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Challenge represents a simple challenge structure to be sent as JSON.
type Challenge struct {
	Question string `json:"question"`
}

// challengeHandler returns a sample challenge as JSON.
func challengeHandler(w http.ResponseWriter, r *http.Request) {
	challenge := Challenge{
		Question: "What is the regex for matching one or more digits?",
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(challenge)
}

func main() {
	// Serve the static files from the frontend folder.
	frontendDir := "./frontend"
	absPath, err := filepath.Abs(frontendDir)
	if err != nil {
		log.Fatal("Error determining absolute path:", err)
	}
	log.Println("Serving static files from:", absPath)
	fs := http.FileServer(http.Dir(frontendDir))
	http.HandleFunc("/", fs)

	// API endpoint for challenges.
	http.HandleFunc("/api/challenge", challengeHandler)

	// Determine port (default to 8080 if not set via environment variable).
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
