const { check, validationResult } = require('express-validator')

const handleParams = params => {
  return check(params, ` ${params} is not defined`)
    .not()
    .isEmpty()
}
const handleError = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
  next()
}

exports.validateAddBoardParams = [
  handleParams('boardTitle'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateRemoveBoardParams = [
  handleParams('boardId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateImageKeyParams = [
  handleParams('key'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateUpdateColumnParams = [
  handleParams('boardId'),
  handleParams('columnId'),
  handleParams('columnTitle'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateColumnParams = [
  handleParams('boardId'),
  handleParams('columnId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateMoveCardOutParams = [
  handleParams('boardId'),
  handleParams('initialColumnId'),
  handleParams('targetColumnId'),
  handleParams('cardId'),
  handleParams('targetPosition'),
  handleParams('cardObject'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateMoveCardInParams = [
  handleParams('boardId'),
  handleParams('columnId'),
  handleParams('cardId'),
  handleParams('targetPosition'),
  handleParams('cardObject'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateCreateCardParams = [
  handleParams('boardId'),
  handleParams('cardTitle'),
  handleParams('tagColor'),
  handleParams('columnId'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateUpdateCardItemsParams = [
  handleParams('boardId'),
  handleParams('cardId'),
  handleParams('columnId'),
  handleParams('cardItem'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]

exports.validateRemoveCardItemsParams = [
  handleParams('cardId'),
  handleParams('cardItem'),
  (req, res, next) => {
    handleError(req, res, next)
  }
]
