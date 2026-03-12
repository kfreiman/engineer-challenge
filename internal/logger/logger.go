// Package logger provides a logging interface for internal packages.
// Context-aware logging methods are only available within internal packages.
package logger

import (
	"context"
	"log/slog"
)

// Logger is a wrapper around slog.Logger that provides context-aware logging methods.
// This interface is only available to internal packages.
type Logger struct {
	*slog.Logger
}

// New creates a new Logger from an slog.Logger.
func New(logger *slog.Logger) Logger {
	return Logger{logger}
}

// InfoContext logs at INFO level with context.
func (l Logger) InfoContext(ctx context.Context, msg string, args ...any) {
	l.Logger.InfoContext(ctx, msg, args...)
}

// ErrorContext logs at ERROR level with context.
func (l Logger) ErrorContext(ctx context.Context, msg string, args ...any) {
	l.Logger.ErrorContext(ctx, msg, args...)
}

// DebugContext logs at DEBUG level with context.
func (l Logger) DebugContext(ctx context.Context, msg string, args ...any) {
	l.Logger.DebugContext(ctx, msg, args...)
}

// WarnContext logs at WARN level with context.
func (l Logger) WarnContext(ctx context.Context, msg string, args ...any) {
	l.Logger.WarnContext(ctx, msg, args...)
}

// Log logs with attributes at the specified level with context.
func (l Logger) Log(ctx context.Context, level slog.Level, msg string, args ...any) {
	l.Logger.Log(ctx, level, msg, args...)
}

// LogAttrs logs with attributes at the specified level with context.
func (l Logger) LogAttrs(ctx context.Context, level slog.Level, msg string, attrs ...slog.Attr) {
	l.Logger.LogAttrs(ctx, level, msg, attrs...)
}

// With returns a Logger that includes the given attributes.
func (l Logger) With(args ...any) Logger {
	return Logger{l.Logger.With(args...)}
}

// WithGroup returns a Logger that starts a group.
// The keys of all attributes added to the Logger will be qualified by the given name.
func (l Logger) WithGroup(name string) Logger {
	return Logger{l.Logger.WithGroup(name)}
}
