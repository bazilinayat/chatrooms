package main

import (
	"log"
	"servering/db"
	"servering/internal/user"
	"servering/internal/ws"
	"servering/router"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatalf("could not initialize database connection: %s", err)
	}

	userResp := user.NewRepository(dbConn.GetDB())
	userSvc := user.NewService(userResp)
	userHandler := user.NewHandler(userSvc)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)

	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.Start("0.0.0.0:8080")
}
