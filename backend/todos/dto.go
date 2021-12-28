package todos

type TodoDtoCreate struct {
	Description string `json:"description"`
}

type TodoDtoUpdate struct {
	Description string `json:"description"`
	Done        bool   `json:"done"`
}
