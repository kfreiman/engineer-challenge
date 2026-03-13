package logger

import (
	"context"
	"log"
	"log/slog"
	"os"
	"strings"

	"github.com/rs/zerolog"
	slogzerolog "github.com/samber/slog-zerolog"
)

type Config struct {
	Format string `env:"FORMAT" env-default:"json" env-description:"Log output format (text or json)" json:"format"`
	Level  string `env:"LEVEL" env-default:"warn" env-description:"Log level (debug, info, warn, error)" json:"level"`
}

// use const for log level
const (
	LogLevelDebug = "debug"
	LogLevelInfo  = "info"
	LogLevelWarn  = "warn"
	LogLevelError = "error"
)

// createLogger creates a slog logger from the configuration
func New(conf Config) *slog.Logger {
	// Case-insensitive log level
	confLevel := strings.ToLower(conf.Level)
	var level slog.Level
	switch confLevel {
	case LogLevelDebug:
		level = slog.LevelDebug
	case LogLevelWarn:
		level = slog.LevelWarn
	case LogLevelError:
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	// Create zerolog logger
	var zerologLogger zerolog.Logger
	if conf.Format == "json" {
		zerologLogger = zerolog.New(os.Stderr)
	} else {
		zerologLogger = zerolog.New(zerolog.ConsoleWriter{Out: os.Stderr}).With().Caller().CallerWithSkipFrameCount(5).Logger()
	}

	// Create slog handler
	loggerConfig := slogzerolog.Option{
		Level:  level,
		Logger: &zerologLogger,
	}.NewZerologHandler()

	logger := slog.New(loggerConfig)

	// Set as default logger
	log.SetFlags(0)
	slog.SetDefault(logger)

	return logger
}

type Logger interface {
	DebugContext(ctx context.Context, msg string, args ...any)
	InfoContext(ctx context.Context, msg string, args ...any)
	WarnContext(ctx context.Context, msg string, args ...any)
	ErrorContext(ctx context.Context, msg string, args ...any)
}
