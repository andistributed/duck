package main

import (
	"embed"
	"flag"
	"path/filepath"

	"github.com/webx-top/echo"
	"github.com/webx-top/echo/defaults"
	"github.com/webx-top/echo/engine/standard"
	"github.com/webx-top/echo/middleware"
)

//go:embed dist
//go:embed index.html
var fs embed.FS

func EmbedFile(fs embed.FS) func(c echo.Context) error {
	return func(c echo.Context) error {
		file := c.Param(`*`)
		if len(file) == 0 {
			file = `index.html`
		}
		f, err := fs.Open(file)
		if err != nil {
			return echo.ErrNotFound
		}
		defer func() {
			if f != nil {
				f.Close()
			}
		}()
		fi, err := f.Stat()
		if err != nil {
			return err
		}
		if fi.IsDir() {
			f.Close()

			file = filepath.Join(file, "index.html")
			if f, err = fs.Open(file); err != nil {
				return echo.ErrNotFound
			}

			if fi, err = f.Stat(); err != nil {
				return err
			}
		}
		return c.ServeContent(f, fi.Name(), fi.ModTime())
	}
}

var listen string
var api string

func init() {
	flag.StringVar(&listen, `listen`, `:8086`, `-listen 127.0.0.1`)
	flag.StringVar(&api, `api`, `http://127.0.0.1:2856`, `-api http://127.0.0.1:2856`)
	flag.Parse()
}

func main() {
	defaults.Use(middleware.Recover(), middleware.Log(), middleware.Gzip())
	defaults.Get(`/*`, EmbedFile(fs))
	defaults.Get(`/`, EmbedFile(fs))
	defaults.Run(standard.New(listen))
}
