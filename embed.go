package duck

import (
	"embed"
)

//go:embed dist
//go:embed index.html
var FS embed.FS
