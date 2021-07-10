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

const defaultVersion = `0.0.3`

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
