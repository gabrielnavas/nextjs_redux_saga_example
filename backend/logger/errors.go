package logger

import "fmt"

type LoggerError interface {
	Log(err error)
}

type PrintLogError struct{}

func (p *PrintLogError) Log(err error) {
	fmt.Println(err)
}
