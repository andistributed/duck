package main

import (
	"flag"
	"fmt"

	"github.com/andistributed/duck"
	"github.com/webx-top/echo"
	"github.com/webx-top/echo/defaults"
	"github.com/webx-top/echo/engine/standard"
	"github.com/webx-top/echo/middleware"
)

var listen string
var api string

func init() {
	flag.StringVar(&listen, `listen`, `:8086`, `-listen 127.0.0.1`)
	flag.StringVar(&api, `api`, `http://127.0.0.1:2856`, `-api http://127.0.0.1:2856`)
	flag.Parse()
}

func main() {
	baseURL := []byte(`window.BASE_URL=` + fmt.Sprintf(`%q`, api) + `;`)
	fs := echo.NewFileSystems()
	fs.Register(duck.FS)
	defaults.Use(middleware.Recover(), middleware.Log(), middleware.Gzip())
	defaults.Get(`/*`, echo.EmbedFile(fs))
	defaults.Get(`/`, echo.EmbedFile(fs))
	defaults.Get(`/config.js`, func(ctx echo.Context) error {
		ctx.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJavaScriptCharsetUTF8)
		return ctx.Blob(baseURL)
	})
	defaults.Run(standard.New(listen))
}
