package main

import (
	"flag"
	"fmt"

	"github.com/andistributed/duck"
	"github.com/webx-top/echo"
	"github.com/webx-top/echo/defaults"
	"github.com/webx-top/echo/engine/standard"
	"github.com/webx-top/echo/handler/embed"
	"github.com/webx-top/echo/middleware"
)

const defaultVersion = `0.1.0`

var listen string
var api string
var version bool

func init() {
	flag.StringVar(&listen, `listen`, `:8086`, `-listen 127.0.0.1:8086`)
	flag.StringVar(&api, `api`, `http://127.0.0.1:2856`, `-api http://127.0.0.1:2856`)
	flag.BoolVar(&version, `version`, false, `-version`)
	flag.Parse()
}

func main() {
	if version {
		fmt.Println(`v` + defaultVersion)
		return
	}
	baseURL := []byte(`window.BASE_URL=` + fmt.Sprintf(`%q`, api) + `;`)
	fs := embed.NewFileSystems()
	fs.Register(duck.FS)
	h := embed.File(fs)
	defaults.Use(middleware.Recover(), middleware.Log(), middleware.Gzip())
	defaults.Get(`/*`, h)
	defaults.Get(`/`, h)
	defaults.Get(`/config.js`, func(ctx echo.Context) error {
		ctx.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJavaScriptCharsetUTF8)
		return ctx.Blob(baseURL)
	})
	defaults.Run(standard.New(listen))
}
