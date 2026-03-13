FROM golang:1.26.1-alpine3.22 AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Build the application
RUN go build -o core main.go

# Run stage
FROM alpine:latest
RUN apk --no-cache add wget
WORKDIR /app
COPY --from=builder /app/core /app/core

EXPOSE 8080

ENTRYPOINT ["/app/core"]
