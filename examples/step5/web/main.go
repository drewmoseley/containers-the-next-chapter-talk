package main

import "net/http"

func main() {
	mux := http.NewServeMux()
	// Serve data.json from the shared volume mounted at /data
	mux.Handle("/data.json", http.FileServer(http.Dir("/data")))
	// Serve the dashboard HTML from the image
	mux.Handle("/", http.FileServer(http.Dir("/www")))
	http.ListenAndServe(":80", mux)
}
